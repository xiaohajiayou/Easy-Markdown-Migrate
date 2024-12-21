import {remotePath, rename,newName, saveFile, getValidFileName,getMdPath,
    getMdEditor,getImages,mdCheck,setPara,escapeStringRegexp, 
    switchPath,urlFormatted,myEncodeURI,insertText,ulTimeout,timeoutPromise,convertPath,
    localFolder, getAutoPath, localCheck,dlTimeout} from './lib/common';

import { getLang } from './lib/lang';
import downloadCore from "./lib/downloadcore.js";
import { window, ProgressLocation } from 'vscode'
import { exec, execSync } from 'child_process';
import { existsSync } from 'fs';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';


// 常用控制台颜色清单
const colorDict =
{
    'reset': '\x1B[0m', // 复位
    'bright': '\x1B[1m', // 亮色
    'grey': '\x1B[2m', // 灰色
    'italic': '\x1B[3m', // 斜体
    'underline': '\x1B[4m', // 下划线
    'reverse': '\x1B[7m', // 反向
    'hidden': '\x1B[8m', // 隐藏
    'black': '\x1B[30m', // 黑色
    'red': '\x1B[31m', // 红色
    'green': '\x1B[32m', // 绿色
    'yellow': '\x1B[33m', // 黄色
    'blue': '\x1B[34m', // 蓝色
    'magenta': '\x1B[35m', // 品红 // purple
    'cyan': '\x1B[36m', // 青色
    'white': '\x1B[37m', // 白色
    'blackBG': '\x1B[40m', // 背景色为黑色
    'redBG': '\x1B[41m', // 背景色为红色
    'greenBG': '\x1B[42m', // 背景色为绿色
    'yellowBG': '\x1B[43m', // 背景色为黄色
    'blueBG': '\x1B[44m', // 背景色为蓝色
    'magentaBG': '\x1B[45m', // 背景色为品红
    'cyanBG': '\x1B[46m', // 背景色为青色
    'whiteBG': '\x1B[47m' // 背景色为白色
};
// VSCode 输出控制台
let out: vscode.OutputChannel = vscode.window.createOutputChannel("easy-markdown-migrate");
// 提示框同一时刻最多显示3个，所以短时间内多个相同输入，进行合并
let msgHash = {
    'warn': [] as string[],
    'error': [] as string[],
    'info': [] as string[],
}


let imagePathBracket = 'auto';

let mdFileAfterRename = ''; // 需要处理的文件
let oMdFileAfterRename: path.ParsedPath; // mdFile的对象结构
let docTextEditorAfterRename: vscode.TextEditor | undefined; // 选择的MD文件
let docPreSelectionAfterRename: vscode.Selection | undefined; // 选择的范围


let mdFileAfterCopy = ''; // 需要处理的文件
let oMdFileAfterCopy: path.ParsedPath; // mdFile的对象结构
let docTextEditorAfterNewFile: vscode.TextEditor | undefined; // 选择的MD文件
let docPreSelectionAfterCopy: vscode.Selection | undefined; // 选择的范围

// save images obj for paste
let cutFileObj:{ local: string[], net: string[], invalid: string[], mapping: Record<string, any>, content: string } |undefined ;
let copyFileObj:{ local: string[], net: string[], invalid: string[], mapping: Record<string, any>, content: string } |undefined ;
let openAfterMigrate = false; // 是否打开文件

let myPicgo: any = null; // picgo对象
let remote = ''; // 是否路径中不增加md文件名的文件夹，默认会自动增加文件夹以将不同md文件的图片分离开


type MsgType = 'err' | 'warn' | 'info' | 'succ';
export let logger = {
    core: function (msgType: MsgType, msg: string, popFlag: boolean = true, immediately: boolean = false) {
        // 核心模块显示
        let color = '', hint = '', arr = [];
        switch (msgType) {
            case 'warn':
                color = colorDict.yellow
                hint = '[Warn]'
                arr = msgHash.warn;
                break;
            case 'succ':
                color = colorDict.green
                arr = msgHash.info;
                break;
            case 'err':
                color = colorDict.red
                hint = '[Err]'
                arr = msgHash.error;
                break;
            case 'info':
                color = colorDict.cyan
                arr = msgHash.info;
                break;
        }
        // console.log(msg);
        // console.log(color, msg, colorDict.reset);
        out.appendLine(hint + msg);
        if (popFlag) {
            if (immediately) {
                vscode.window.showWarningMessage(msg);
            } else {
                arr.push(msg.toString());
            }
        }
    },
    warn: function (msg: string, popFlag: boolean = true, immediately: boolean = false) {
        //console.log( chalk.yellow(...msg))
        this.core('warn', msg, popFlag, immediately);
    },
    success: function (msg: string, popFlag: boolean = true, immediately: boolean = false) {
        //console.log( chalk.green(...msg))
        this.core('succ', msg, popFlag, immediately);
        
    },
    error: function (msg: string, popFlag: boolean = true, immediately: boolean = false) {
        //console.log( chalk.red(...msg))
        this.core('err', msg, popFlag, immediately);
    },
    info: function (msg: string, popFlag: boolean = true, immediately: boolean = false) {
        //console.log( chalk.blue(...msg))
        this.core('info', msg, popFlag, immediately);
    }
};


export async function copyContent(selectFlag:boolean= true) {
    cutFileObj = undefined;
    let fileObj = getImages(selectFlag);
    if(fileObj.content == '')
        {
            logger.error('No image copy, cannot paste.');
            return '';
        }
    copyFileObj = fileObj;
    
    let fileArr = fileObj.local; // 本地文件上传
    let fileMapping = fileObj.mapping; // 本地原始信息
    let content = fileObj.content;
    //downThread = thread;
    // 对网络图片去重，不必每次下载
    let set = new Set(); 
    fileArr.forEach((item)=> set.add(item)); 
    let uniArr:string[] = Array.from(set) as string[];
    let count=0,len = uniArr.length;
    for(let file of uniArr)
    {

        logger.info(`Image copied : [${file}] ], ${count+1}/${len}`,false);
        try{

            // fs.renameSync(file,newFile);
            let b = escapeStringRegexp(fileMapping[file]);
            var reg = new RegExp( '!\\[([^\\]]*)\\]\\('+ escapeStringRegexp(fileMapping[file]) +'\\)','ig');
            //转为相对路径
            // content =  ''; // 内容替换
            count++;
        }catch(e)
        {
            logger.error('move error:');
            console.log(e);
        }
    }
    await saveFile(content,count,selectFlag);
    logger.success('copy successfully.', true);
}
export async function copyContentToClipboard(selectFlag:boolean= true) {
    cutFileObj = undefined;
    let fileObj = getImages(selectFlag);
    if(fileObj.content == '')
        {
            logger.error('No image copy, cannot paste.');
            return '';
        }
    copyFileObj = fileObj;
    
    let fileArr = fileObj.local; // 本地文件上传
    let fileMapping = fileObj.mapping; // 本地原始信息
    let content = fileObj.content;
    //downThread = thread;
    // 对网络图片去重，不必每次下载
    let set = new Set(); 
    fileArr.forEach((item)=> set.add(item)); 
    let uniArr:string[] = Array.from(set) as string[];
    let count=0,len = uniArr.length;
    for(let file of uniArr)
    {

        logger.info(`Image copied : [${file}] ], ${count+1}/${len}`,false);
        try{

            // fs.renameSync(file,newFile);
            copyFileToClipboardCMD(file);
            // copyFileToClipboardCMD(fileMapping[file]);
            // copyFileToClipboardCMD(myEncodeURI(file, urlFormatted));
            count++;
        }catch(e)
        {
            logger.error('move error:');
            console.log(e);
        }
    }
}
// 调用系统命令复制文件到系统剪贴板
function copyFileToClipboardCMD(filePath: string) {

	if (!existsSync(filePath)) {
        console.error(`File ${filePath} does not exist`);
        return;
    }

    const callback = (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
			// new Notice(`Error executing command: ${error.message}`, SUCCESS_NOTICE_TIMEOUT);
			console.error(`Error executing command: ${error.message}`);
			return;
        }
    };

    if (process.platform === 'darwin') {
		// 解决方案1: 会调出Finder，产生瞬间的窗口，但是该复制操作完全是系统级别的，没有任何限制
		execSync(`open -R "${filePath}"`);
        execSync(`osascript -e 'tell application "System Events" to keystroke "c" using command down'`);
        execSync(`osascript -e 'tell application "System Events" to keystroke "w" using command down'`);
		execSync(`open -a "Obsidian.app"`);

		// ----------------------------------------------
		// 测试切换输入法方案: 模拟Shift键按下，但是失败了
		// execSync(`osascript -e 'tell application "System Events" to key down shift'`);
		// execSync(`osascript -e 'delay 0.05'`);
		// execSync(`osascript -e 'tell application "System Events" to key up shift'`);
		// ----------------------------------------------

		// ----------------------------------------------
		// 另一种解决方案，不会调出Finder，但是复制的文件无法粘贴到word或者微信中
		// const appleScript = `
		// 	on run args
		// 		set the clipboard to POSIX file (first item of args)
		// 	end
		// 	`;
		// exec(`osascript -e '${appleScript}' "${filePath}"`, callback);
		// ----------------------------------------------

    } else if (process.platform === 'linux') {
		// 目前方案
		// xclip -selection clipboard -t $(file --mime-type -b /path/to/your/file) -i /path/to/your/file
        // exec(`xclip -selection c < ${filePath}`, callback);
		// exec(`xclip -selection clipboard -t $(file --mime-type -b "${filePath}") -i "${filePath}"`, callback);
    } else if (process.platform === 'win32') {
		// 当文件路径包含 '
		// 在PowerShell中，单引号字符串是直接的字符串，内部的单引号无法通过反斜线来转义，但是可以通过在单引号前再加一个单引号来进行转义。
		// let safeFilePath = filePath.replace(/'/g, "''");
        let safeFilePath = myEncodeURI(filePath, urlFormatted)
        safeFilePath =  decodeURI(safeFilePath);
        exec(`powershell -command "Set-Clipboard -LiteralPath '${safeFilePath}'"`);
    }
}
export async function cutContent(imageTargetFolder:string,selectFlag:boolean= true) {
    copyFileObj = undefined;
    let cleanFlag = true;
    let fileObj = getImages(selectFlag);
    if(fileObj.content == '')
    {
        logger.error('No image cut, cannot paste.');
        return '';
    }
    cutFileObj = fileObj;
    
    let fileArr = fileObj.local; // 本地文件上传
    let fileMapping = fileObj.mapping; // 本地原始信息
    let content = fileObj.content;
    //downThread = thread;
    // 对网络图片去重，不必每次下载
    let set = new Set(); 
    fileArr.forEach((item)=> set.add(item)); 
    let uniArr:string[] = Array.from(set) as string[];
    let count=0,len = uniArr.length;
    for(let file of uniArr)
    {
        let newFileName = '';
        // 转移到目标路径 
        let imageFile = path.parse(file);

        // 仅仅更换目录
        newFileName = imageFile.base;

        let newFile = await getValidFileName(imageTargetFolder, newFileName);
        if (newFile == '') {
            logger.error(`get new image file name[${newFile}] fail!`);
            return '';
        }
        logger.info(`Image cutped : [${file}] ], ${count+1}/${len}`,false);
        try{

            fs.renameSync(file,newFile);
            let b = escapeStringRegexp(fileMapping[file]);
            var reg = new RegExp( '!\\[([^\\]]*)\\]\\('+ escapeStringRegexp(fileMapping[file]) +'\\)','ig');
            //转为相对路径
            content =  ''; // 内容替换
            count++;
        }catch(e)
        {
            logger.error('move error:');
            console.log(e);
        }
    }
    await saveFile(content,count,selectFlag,cleanFlag);
    logger.success('Cut successfully.', true);
}
export async function pasteContent(selectFlag:boolean= true) {
    let mdFilePath = getMdPath();
    if (!mdFilePath) {
        vscode.window.showErrorMessage('No file path found for the active document.');
        return;
    }
    let mdFileFolder = path.dirname(mdFilePath);
    let imageTargetFolder = path.join(mdFileFolder, 'images');
    let copyFileFlag = false; // 是否是复制
    let fileObj;
    if(cutFileObj == undefined&&copyFileObj == undefined) {
        logger.error('No image copy or cut, cannot paste.');
        return;
    }
    if(cutFileObj!= undefined) {
        copyFileFlag = false;
        fileObj = cutFileObj;
    }else if(copyFileObj!= undefined) {
        copyFileFlag = true;
        fileObj = copyFileObj;
    }
    if(fileObj == undefined) { return; }
    // let fileObj = savedFileObj;
    let fileArr = fileObj.local; // 本地文件上传
    let fileMapping = fileObj.mapping; // 本地原始信息
    let content = fileObj.content;
    //downThread = thread;
    // 对网络图片去重，不必每次下载
    let set = new Set(); 
    fileArr.forEach((item)=> set.add(item)); 
    let uniArr:string[] = Array.from(set) as string[];
    let count=0,len = uniArr.length;
    for(let file of uniArr)
    {
        let newFileName = '';
        // 转移到目标路径 
        let imageFile = path.parse(file);
        if(rename)
        {
            //文件重命名
            newFileName = newName()+ imageFile.ext;
        }else{
            // 仅仅更换目录
            newFileName = imageFile.base;
        }
        let newFile = await getValidFileName(imageTargetFolder,newFileName);
        if( newFile == ''){
            logger.error(`get new image file name[${newFile}] fail!`);
            return '';
        }
        logger.info(`[${file}] move to [${newFile}], ${count+1}/${len}`,false);
        try{

            if(copyFileFlag) {
                fs.copyFileSync(file,newFile);
            }else{
                fs.renameSync(file,newFile);
            }
            let b = escapeStringRegexp(fileMapping[file]);
            var reg = new RegExp( '!\\[([^\\]]*)\\]\\('+ escapeStringRegexp(fileMapping[file]) +'\\)','ig');
            //转为相对路径
            content =  content.replace(reg,'![$1]('+ convertAbOrRelative( newFile) +')'); // 内容替换
            count++;
        }catch(e)
        {
            logger.error('move error:');
            console.log(e);
        }
    }
    await saveFile(content,count,selectFlag);
    // logger.success('Paste successfully.', true, true);
}
export function clearMsg() {
    msgHash.info = [];
    msgHash.warn = [];
    msgHash.error = [];
    out.clear();
    out.show();
}

export async function analyze() {
    // 保存当前标签页
    let docTextEditor = vscode.window.activeTextEditor; // 获取当前活动文本编辑器
    if(docTextEditor == null) { return; }
    await docTextEditor.document.save();

    
    showStatus(docTextEditor);
}


export function suspendedLogMsg(modal: boolean = false) {
    out.show();
    if (msgHash.warn.length > 0) {
        let msg = msgHash.warn.join('\n');
        if (!modal) {
            msg = msg.replace(/\n+/g, '|');
        }
        vscode.window.showWarningMessage(msg, { modal });
    }
    if (msgHash.error.length > 0) {
        let msg = msgHash.error.join('\n');
        if (!modal) {
            msg = msg.replace(/\n+/g, '|');
        }
        vscode.window.showErrorMessage(msg, { modal });
    }
    if (msgHash.info.length > 0) {
        let msg = msgHash.info.join('\n');
        if (!modal) {
            msg = msg.replace(/\n+/g, '|');
        }
        vscode.window.showInformationMessage(msg, { modal });
    }
}

export function showStatus(docTextEditor: vscode.TextEditor| undefined) {
    try {
        var obj = getRenamedImgs(docTextEditor);
        if (obj.content == '') { return; }
        logger.info(`\n`, false);
        logger.info(`+------------------------------------+`, false);
        logger.info(`|    Image Links Analyse Report      |`, false);
        logger.info(`+------------------------------------+`, false);
        logger.info(`|       * Local Images: ${obj.local.length} *     `, false);
        
        obj.local.forEach(image => {
            let oriImageFlepath = obj.mapping[image] ;
            logger.info(`|      ${oriImageFlepath}                       `, false);
            // logger.info(`|       * Network Images: ${obj.net.length} *     `, false);
        });
        logger.info(`+------------------------------------+`, false);
        logger.info(`|       * Network Images: ${obj.net.length} *     `, false);
        
        obj.net.forEach(image => {
            logger.info(`|  ${image}                                      `, false);
        });
        logger.info(`+------------------------------------+`, false);

        if(obj.invalid.length == 0) {
            logger.info(`|           successfully             |`, false);
            logger.info(`+------------------------------------+`, false);
        }else {
            logger.info(`|       * Invalid Images: ${obj.invalid.length} *     `, false);
            obj.invalid.forEach(image => {
                logger.info(`|  ${image}                                      `, false);
            });
            logger.info(`+------------------------------------+`, false);
            logger.info(`|               Erro                 |`, false);
            logger.info(`+------------------------------------+`, false);
            logger.info(`| Warning: Invalid image detected. Please check.|`, false);
        }
        logger.info(`\n`, false);
    } catch (e: any) {
        logger.error(e.message);
    }
}


export async function moveImg(lf:string,selectFlag:boolean= true) // ,thread:number
{
    let localFolder = lf;
    let fileObj = getImages(selectFlag);
    if(fileObj.content == '')
    {
        return '';
    }
    let fileArr = fileObj.local; // 本地文件上传
    let fileMapping = fileObj.mapping; // 本地原始信息
    let content = fileObj.content;
    //downThread = thread;
    // 对网络图片去重，不必每次下载
    let set = new Set(); 
    fileArr.forEach((item)=> set.add(item)); 
    let uniArr:string[] = Array.from(set) as string[];
    let count=0,len = uniArr.length;
    for(let file of uniArr)
    {
        let newFileName = '';
        // 转移到目标路径 
        let imageFile = path.parse(file);
        if(rename)
        {
            //文件重命名
            newFileName = newName()+ imageFile.ext;
        }else{
            // 仅仅更换目录
            newFileName = imageFile.base;
        }
        let newFile = await getValidFileName(localFolder,newFileName);
        if( newFile == ''){
            logger.error(`get new image file name[${newFile}] fail!`);
            return '';
        }
        logger.info(`[${file}] move to [${newFile}], ${count+1}/${len}`,false);
        try{

            fs.renameSync(file,newFile);
            let b = escapeStringRegexp(fileMapping[file]);
            var reg = new RegExp( '!\\[([^\\]]*)\\]\\('+ escapeStringRegexp(fileMapping[file]) +'\\)','ig');
            //转为相对路径
            content =  content.replace(reg,'![$1]('+ convertAbOrRelative( newFile) +')'); // 内容替换
            count++;
        }catch(e)
        {
            logger.error('move error:');
            console.log(e);
        }
    }
    await saveFile(content,count,selectFlag);
}


export async function migrateImg(imageTargetFolder:string,selectFlag:boolean= false) // ,thread:number
{

    let fileObj = getImages(selectFlag);
    if (fileObj.content == '') {
        return '';
    }
    let fileArr = fileObj.local; // 本地文件上传
    let fileMapping = fileObj.mapping; // 本地原始信息
    let content = fileObj.content; 

    //downThread = thread;
    // 对网络图片去重，不必每次下载
    let set = new Set();
    fileArr.forEach((item) => set.add(item));
    let uniArr: string[] = Array.from(set) as string[];
    let count = 0, len = uniArr.length;
    for (let file of uniArr) {
        let newFileName = '';
        // 转移到目标路径 
        let imageFile = path.parse(file);
        if (rename) {
            // 文件重命名
            newFileName = newName() + imageFile.ext;
        } else {
            // 仅仅更换目录
            newFileName = imageFile.base;
        }
        let newFile = await getValidFileName(imageTargetFolder, newFileName);
        if (newFile == '') {
            logger.error(`get new image file name[${newFile}] fail!`);
            return '';
        }
        logger.info(`[${file}] move to [${newFile}], ${count+1}/${len}`, false);
        try{
            fs.renameSync(file,newFile);
            var reg = new RegExp( '!\\[([^\\]]*)\\]\\('+ escapeStringRegexp(fileMapping[file]) +'\\)','ig');
            let a = convertAbOrRelative( newFile) ;
            content =  content.replace(reg,'![$1]('+ 'images/'+ newFileName+')'); // 内容替换
            count++;
        }catch(e)
        {
            logger.error('move error:');
            console.log(e);
        }
    }
    await saveFile(content,count);
}


export async function migrateRenamedImg(imageTargetFolder:string,docTextEditor: vscode.TextEditor | undefined) // ,thread:number
{

    let fileObj = getRenamedImgs(docTextEditor);
    if (fileObj.content == '') {
        return '';
    }
    let fileArr = fileObj.local; // 本地文件上传
    let fileMapping = fileObj.mapping; // 本地原始信息
    let content = fileObj.content; 

    //downThread = thread;
    // 对网络图片去重，不必每次下载
    let set = new Set();
    fileArr.forEach((item) => set.add(item));
    let uniArr: string[] = Array.from(set) as string[];
    let count = 0, len = uniArr.length;
    for (let file of uniArr) {
        let newFileName = '';
        // 转移到目标路径 
        let imageFile = path.parse(file);
        if (rename) {
            // 文件重命名
            newFileName = newName() + imageFile.ext;
        } else {
            // 仅仅更换目录
            newFileName = imageFile.base;
        }
        let newFile = await getValidFileName(imageTargetFolder, newFileName);
        if (newFile == '') {
            logger.error(`get new image file name[${newFile}] fail!`);
            return '';
        }
        logger.info(`[${file}] move to [${newFile}], ${count+1}/${len}`, false);
        try{
            fs.renameSync(file,newFile);
            var reg = new RegExp( '!\\[([^\\]]*)\\]\\('+ escapeStringRegexp(fileMapping[file]) +'\\)','ig');
            let a = convertAbOrRelative( newFile) ;
            content =  content.replace(reg,'![$1]('+ 'images/'+ newFileName+')'); // 内容替换
            count++;
        }catch(e)
        {
            logger.error('move error:');
            console.log(e);
        }
    }
    await saveFileRenamed(docTextEditor,content,count);
}



export async function migrateFile(localFolder: string) {

    let mdFilePath = getMdPath();
    if (!mdFilePath) {
        vscode.window.showErrorMessage('No file path found for the active document.');
        return;
    }
    // 构建目标文件路径
    const mdFileName = path.basename(mdFilePath);
    const mdTargetFilePath = path.join(localFolder, mdFileName);
    

    try {

        // 移动文件
        fs.renameSync(mdFilePath, mdTargetFilePath);
        logger.info(`Moved Markdown file to: [${mdTargetFilePath}]`,false);
        let currentEditor = getMdEditor(); // 获取初始活动文本编辑器
        if(currentEditor == null) { return; }

        // 如果当前活动编辑器是被移动的文件，则关闭它
  
        await vscode.window.showTextDocument(currentEditor.document, currentEditor.viewColumn)
        
        await   vscode.commands.executeCommand('workbench.action.closeActiveEditor')
    
        // 打开新位置的文件
        await   openAndEditMarkdownFile(mdTargetFilePath);
                    
        // 保存当前标签页
        let docTextEditor = vscode.window.activeTextEditor; // 获取当前活动文本编辑器
        if(docTextEditor == null) { return; }
        // await docTextEditor.document.save();

        showStatus(docTextEditor);
        if(!openAfterMigrate) {
            await   vscode.commands.executeCommand('workbench.action.closeActiveEditor'); // 关闭当前标签页
        }


    } catch (error) {
        // 类型保护
        if (error instanceof Error) {
            vscode.window.showErrorMessage(`Failed to move the Markdown file: ${error.message}`);
        } else {
            vscode.window.showErrorMessage(`Failed to move the Markdown file: ${String(error)}`);
        }
    }
}


export async function drop(recycleBinPath:string) {
    let mdFilePath = getMdPath();
    if (!mdFilePath) {
        vscode.window.showErrorMessage('No file path found for the active document.');
        return;
    }
    // 构建目标文件路径
    const mdFileName = path.basename(mdFilePath);
    const mdTargetFilePath = path.join(recycleBinPath, mdFileName);

    try {

        // 移动文件
        fs.renameSync(mdFilePath, mdTargetFilePath);
        let currentEditor = getMdEditor(); // 获取初始活动文本编辑器
        if(currentEditor == null) { return; }

        // 如果当前活动编辑器是被移动的文件，则关闭它
  

        await vscode.window.showTextDocument(currentEditor.document, currentEditor.viewColumn)
        
        await   vscode.commands.executeCommand('workbench.action.closeActiveEditor')
    
        // 打开新位置的文件
        await   openAndEditMarkdownFile(mdTargetFilePath);
                    
        // 保存当前标签页
        let docTextEditor = vscode.window.activeTextEditor; // 获取当前活动文本编辑器
        if(docTextEditor == null) { return; }
        await docTextEditor.document.save();

        showStatus(docTextEditor);
        if(!openAfterMigrate) {
            await   vscode.commands.executeCommand('workbench.action.closeActiveEditor'); // 关闭当前标签页
        }
        logger.success('Drop successfully.', true);


    } catch (error) {
        // 类型保护
        if (error instanceof Error) {
            vscode.window.showErrorMessage(`Failed to move the Markdown file: ${error.message}`);
        } else {
            vscode.window.showErrorMessage(`Failed to move the Markdown file: ${String(error)}`);
        }
    }


}

// 上传所选图片/剪切板图片
// export async function vscUpload(clip:boolean=false) {
//     if (!await upCheck()) {
//         showInVscode();
//         return;
//     }
//     await upload(clip);
//     showInVscode();
// }
// 插入剪切板图片

function cleanInvalidLinks() {
    try {
        var obj = getImages();
        if (obj.content == '') { return; }
        // 循环替换失效的链接
        let content = obj.content;
        let count = 0;
        for (let file of obj.invalid) {
            logger.info(`clean link [${file}]`, false);
            var reg = new RegExp('!\\[([^\\]]*)\\]\\(' + escapeStringRegexp(file) + '\\)', 'ig');
            content = content.replace(reg, ''); // 内容替换
            count++;
        }
        saveFile(content, count);
    } catch (e: any) {
        logger.error(e.message);
    }
}
export async function cleanWithSelectedLinks(flag :string,selectFlag:boolean= true) {

    let file = vscode.window.activeTextEditor?.document.uri.fsPath || '';
    if (!mdCheck(file)) {
        suspendedLogMsg();  //由于自动更新了一次url，刷新光标位置，躲避误触检测
        return '';
    }
    let fileObj = getImages(selectFlag); // 获取图片信息
    if (fileObj.content == '') {
        logger.error(`No image  select to ${flag}.`);
        return '';
    }
    let fileArr = fileObj.local; // 本地文件上传
    let content = fileObj.content;
    if(flag == 'cut') {
        copyFileObj = undefined;
        cutFileObj = fileObj;
    }

    //downThread = thread;
    // 对网络图片去重，不必每次下载
    let set = new Set();
    fileArr.forEach((item) => set.add(item));
    let uniArr: string[] = Array.from(set) as string[];
    let count = 0, len = uniArr.length;
    for (let file of uniArr) {

        logger.info(`Image ${flag} : [${file}] ], ${count+1}/${len}`,false);
        try{
            content =  ''; // 清空内容
            count++;
        }catch(e)
        {
            logger.error(`${flag} error`);
            console.log(e);
        }
    }
    await saveFile(content,count,selectFlag,true);
    logger.success(`${flag} successfully.`, true);

}

export async function download(updateOrigin:boolean=false) // ,thread:number
{
    let fileObj ;
    if (!localCheck()) {
        return;
    }
    if(updateOrigin) {
        await originFileProduce(true);   
        fileObj = getRenamedImgs(docTextEditorAfterNewFile); // 获取新创建文件内信息
    } else {
        fileObj = getImages();
    }
    
    if(fileObj == undefined) {
        return ;
    } 
    let fileArr = fileObj.net;
    let content = fileObj.content;
    //downThread = thread;
    // 对网络图片去重，不必每次下载
    let set = new Set();
    fileArr.forEach((item) => set.add(item));
    let downArr: string[] = Array.from(set) as string[];
    let count = 0, len = downArr.length;
    let successCount = 0;

    // 一直等着下载完毕，超时100秒
    let rres:any;
    var p = new Promise((resolve,reject) => {
        rres = resolve;
    });
    logger.warn('Downloading images. Stay on this page.',true,true);
    window.withProgress({ title: getLang('dling'), location: ProgressLocation.Notification }, async (progress, token) => {
        for (let file of downArr) {
            count++;
            logger.info(`downloading [${file}], ${count}/${len}`, false);
            let fileBasename = path.basename(file)
            progress.report({ increment: 100/ len , message: getLang('dling2',fileBasename,count,len) });
            try {
                // 此处需要配置超时，不应该在外面超时
                let res = await timeoutPromise(downloadCore(file, localFolder, rename), dlTimeout*1000 ,getLang('dltimeout',fileBasename,dlTimeout));
                let resfile = res as string;
                if (resfile == '') { continue; }
                let newfile = getAutoPath(resfile);
                // 适配图片的格式
                var reg = new RegExp('!\\[([^\\]]*)\\]\\(' + escapeStringRegexp(file) + '\\)', 'ig');
                let relativeNewFile = convertAbOrRelative(newfile);
                content = content.replace(reg, '![$1](' + relativeNewFile + ')'); // 内容替换
                successCount++;
            } catch (e) {
                console.log(e)
                logger.error( getLang('dlerror', fileBasename) );
                rres('error')
                return Promise.reject()
            }
        }
        if(updateOrigin) {
            await saveFileRenamed(docTextEditorAfterNewFile,content, successCount);
        } else {
            await saveFile(content, successCount);
        }
        rres('finish')
        return Promise.resolve()
    });

    return p;
}




export async function upCheck() {
    try {
        // logger.info(`start to init imagebed moudle , please wait.`, false,true);
        const { PicGo } = require('picgo');
        myPicgo = PicGo;
    } catch (e) {
        // let res = await installPicgo()
        // if( res == 'ok')
        // {
        //     promptToReloadWindow(getLang('picgotry'))
        // }else{
        //     logger.error(getLang('picgofail'))
        // }
        logger.error('PicGo moudle init error:');
        console.log(e);
        return false;
    }
    // 需要处理的文件
    // 对MD的结构化
    remote = convertPath(remotePath)
    return true;
}
function getPicgoConfig():string | undefined {
    const config = vscode.workspace.getConfiguration('picgo');
    let picgoConfig ;
    if(config.get<string>('uploader') == 'github') {
        picgoConfig = {
            picBed: {
              uploader: config.get<string>('uploader'),
              current: config.get<string>('uploader'),
              github: {
                 repo: config.get<string>('repo'),
                 branch: config.get<string>('branch'),
                 token: config.get<string>('token'),
                 path: config.get<string>('path'),
                 customUrl: config.get<string>('customUrl')
              }
            },
            picgoPlugins: {}
         };
    } else if(config.get<string>('uploader') == 'smms'){
        picgoConfig = {
            picBed: {
              uploader: config.get<string>('uploader'),
              smms: {
                 token: config.get<string>('token'),
              }
            },
            picgoPlugins: {}
         };
    }

         // 将配置对象写入 JSON 

     let mdOriginFilePath = getOriginMdPath();
     if (!mdOriginFilePath) {
         vscode.window.showErrorMessage('No file path found for the active document.');
         return;
     }
     // 获取 VSCode 窗口的根目录路径
         // 获取工作区的根路径
     let rootPath: string ;
     const workspaceFolders = vscode.workspace.workspaceFolders;
     if (workspaceFolders) {
         // 通常，我们取第一个工作区根路径作为当前文件所属的工作区
         rootPath = workspaceFolders[0].uri.fsPath;
         // 确保当前文件确实在工作区内
         if (!mdOriginFilePath.startsWith(rootPath)) {
             return undefined;
         }
     }else {
         return undefined;
     }
         // 构建 .recycle 目录路径
     let imageBedConfig = path.join(rootPath, '.picgo'); 
         // 检查 .recycle/images 文件夹是否存在，不存在则创建
     if (!fs.existsSync(imageBedConfig)) {
         try {
             fs.mkdirSync(imageBedConfig, { recursive: true });
             console.log(`Created directory: ${imageBedConfig}`);
         } catch (error) {
             console.error(`Failed to create directory: ${imageBedConfig}`, error);
             vscode.window.showErrorMessage(`Failed to create .recycle directory: ${error}`);
             return undefined;
         }
     }
     const picgoConfigPath = path.join(imageBedConfig, 'picgoConfig.json');
     fs.writeFileSync(picgoConfigPath, JSON.stringify(picgoConfig, null, 4));
     return picgoConfigPath;
}
export async function upload(clipBoard: boolean = false, select: boolean = false) // ,thread:number
{
    logger.info(`Uploading image, please stay focus and do not leave !`, true,true);
    let picgoConfigPath = getPicgoConfig();
    if(picgoConfigPath == undefined) {
        logger.info(`picgo config error ! please check.`, true,true);
        return;
    }
    const picgo1 = new myPicgo(picgoConfigPath); // 将使用默认的配置文件：~/.picgo/config.json
    // const picgo1 = new myPicgo(); // 将使用默认的配置文件：~/.picgo/config.json
    picgo1.on('beforeUpload', (ctx: any) => {
        let fileName = ctx.output[0].fileName;
        let upFile = path.parse(fileName);
        if (rename) {
            // 36 进制重命名上传后的文件
            fileName = path.join(upFile.dir, new Date().getTime().toString(36) + upFile.ext);
        }
        if (remote != '') {
            // 需要添加 md名的目录
            ctx.output[0].fileName = `${remote}/` + fileName;
        }
        // console.log(ctx.output) // [{ base64Image, fileName, width, height, extname }]
    });

    let file = vscode.window.activeTextEditor?.document.uri.fsPath || '';
    if (!mdCheck(file)) {
        suspendedLogMsg();  //由于自动更新了一次url，刷新光标位置，躲避误触检测
        return '';
    }
    let fileMapping: Record<string, any>;
    let fileArr;
    let content = '';
    let fileObj;

    if(select) {
        fileObj = getImages(true);; // 根据选择的内容上传
    }else {
        await originFileProduce();
        fileObj = getImages();; // 根据选择的内容上传
    }

    
    fileArr = fileObj.local; // 本地文件上传
    fileMapping = fileObj.mapping; // 本地原始信息
    content = fileObj.content;
    if (fileArr.length == 0) {
        logger.error(getLang('docSelect'))
        return;
    }


    
    //downThread = thread;
    // 对网络图片去重，不必每次下载
    let set = new Set();
    fileArr.forEach((item) => set.add(item));
    let upArr: string[] = Array.from(set) as string[];
    let count = 0, len = upArr.length;
    let successCount = 0;

    // 一直等着下载完毕，超时100秒
    let rres: any;
    var p = new Promise((resolve, reject) => {
        rres = resolve;
    });
    window.withProgress({ title: getLang('uping'), location: ProgressLocation.Notification }, async (progress, token) => {
        for (let file of upArr) {
            count++;
            if (clipBoard) {
                file = 'clipboard';
            }
            logger.info(`uploading [${file}], ${count}/${len}`, false);
            let fileBasename = path.basename(file)
            progress.report({ increment: 100 / len , message: getLang('uping2', fileBasename , count, len) });
            try {
                let upList: string[] = [];
                if (!clipBoard) {
                    upList = [file];
                }
                // 一次上传一个
                let netFile = await timeoutPromise(picgo1.upload(upList), ulTimeout*1000 ,getLang('uptimeout',fileBasename,ulTimeout));
                // 成功上传返回结果
                if(netFile == '')
                {
                    // 超时
                    console.log('timeout continue')
                    continue; 
                }else if (netFile.length > 0) {
                    let first = netFile[0];
                    let imgPath = first.imgUrl||first.url;
                    if(imgPath==null || imgPath =='')
                    {
                        logger.error(getLang('uploadFail',file));
                        console.log(first)
                        continue; 
                    }
                    if (clipBoard) {
                        content = '![](' + imgPath + ')';
                    } else {
                        // 适配图片的格式
                        var reg = new RegExp('!\\[([^\\]]*)\\]\\(' + escapeStringRegexp(fileMapping[file]) + '\\)', 'ig');
                        content = content.replace(reg, '![$1](' + imgPath + ')'); // 内容替换
                    }
                    successCount++;
                }else{
                    logger.error(getLang('uploadFail',file)+'-2');
                    console.log(netFile)
                    continue; 
                }
            } catch (e) {
                console.log(e);
                logger.error(getLang('uperror', fileBasename, (e as any).message || ''));
                rres('error')
                return Promise.resolve()
            }
        }
        if (clipBoard) {
            await insertText(content);
        } else {
            await saveFile(content,successCount,select);
                    // 保存当前标签页
            let docTextEditor = vscode.window.activeTextEditor; // 获取当前活动文本编辑器
            if(docTextEditor == null) { return; }
            // await docTextEditor.document.save();

            showStatus(docTextEditor);

            // if(!openAfterMigrate) {
            //     await   vscode.commands.executeCommand('workbench.action.closeActiveEditor'); // 关闭当前标签页
            // }
        }
        rres('finish')
        return Promise.resolve()
        //else return Promise.reject()
    });
    return p;
}



export function getRenamedImgs(docTextEditor: vscode.TextEditor | undefined): {local: string[], net: string[], invalid: string[], mapping: Record<string, any>, content: string } {
    var picArrLocal: string[] = [];
    var oriMapping = {};
    var picArrInvalid: string[] = [];
    var picArrNet: string[] = [];
    var str = '';
    let retObj = { local: picArrLocal, net: picArrNet, invalid: picArrInvalid, mapping: oriMapping, content: str };
 
    let editContent = '';
    logger.info(`currentEditor is [${docTextEditor?.document.uri.fsPath}]`,false);
    const currentEditor = docTextEditor;
    if (currentEditor == null) {
        logger.error(getLang('docAct'))
        return retObj;
    }

    let document = currentEditor.document; // 当前编辑内容 ，可能因选择文件等导致不是当前文件
    // 对整个文件内容操作
    if (document.isDirty) { // 文件是否被修改过
        logger.error(getLang('docDirty'))
        return retObj;
    }
    editContent = document?.getText(); // 当前编辑内容;

    try {
        // str = fs.readFileSync(mdfileName).toString();
        str = editContent; // 文本内容覆盖过去
        // 正则格式
        var reg;
        if (imagePathBracket == 'yes') {
            reg = /!\[[^\]]*\]\((.*)\)/g; // 适配所有格式的图片,贪婪匹配可能多个连续的图片被包含
        } else {
            // imagePathBracket =='no' or auto
            reg = /!\[[^\]]*\]\((.*?)\)/g; // 图片路径中没括号，非贪婪匹配
        }
        //const pattern = /!\[(.*?)\]\((.*?)\)/gm // 匹配图片正则
        // const imgList = str.match(pattern) || [] // ![img](http://hello.com/image.png)
        // let tmpPicArrNet: string[] = [],tmpPicArrLocal: string[]=[],tmpPicArrInvalid: string[]=[],tmpOriMapping={};
        findRenamedImage(document.uri.fsPath,reg, str, imagePathBracket == 'auto', picArrNet, picArrLocal, picArrInvalid, oriMapping);
        /*if(picArrInvalid.length>0 && )
        {
            // 尝试有括号重新查找
            //reg = /!\[[^\]]*\]\((.*)\)/g;  // 不能有空格
            // tmpPicArrNet = [],tmpPicArrLocal=[],tmpPicArrInvalid=[],tmpOriMapping={}; // 复位
            //picArrNet =[],picArrLocal=[],picArrInvalid=[],oriMapping={}
            findImage(reg,str,true,picArrNet,picArrLocal,picArrInvalid,oriMapping);
        }*/
        // 进行解构赋值
        // ({picArrNet,picArrLocal,picArrInvalid,oriMapping} = {tmpPicArrNet,tmpPicArrLocal,tmpPicArrInvalid,tmpOriMapping});
    } catch (e: any) {
        console.log(e.message);
    }
    if (picArrInvalid.length > 0) {
        logger.error(getLang('invaldimage', picArrInvalid.length));
        logger.error(`${picArrInvalid.join('\n')}`);
    }
    retObj = { local: picArrLocal, net: picArrNet, invalid: picArrInvalid, mapping: oriMapping, content: str };
    return retObj; //{ local: picArrLocal, net: picArrNet, mapping: oriMapping, content: str };
}


export function findRenamedImage(mdFile: string,reg: any, str: string, auto: boolean, tmpPicArrNet: string[], tmpPicArrLocal: string[], tmpPicArrInvalid: string[], tmpOriMapping: Record<string, any>) {
    //var mdfileName = fs.realpathSync(mdFile);
    var mdfilePath = path.dirname(mdFile); //arr.join('/'); // 获取文件路径
    while (true) {
        let matched = reg.exec(str);
        if (matched == null) { break; }
        let oriFlepath: string = matched[1];
        // 自动抵消匹配括号
        if (auto && oriFlepath.indexOf('(') > 0) {
            var reg2 = new RegExp('!\\[([^\\]]*)\\]\\(' + escapeStringRegexp(oriFlepath) + '\\)', 'ig');
            str = str.replace(reg2, '![$1](' + oriFlepath.replace('(', '<LB>') + '<RB>'); // 内容替换<RB>
            reg.lastIndex = matched.index; // 动态调整，重新正则匹配
            continue;
        }
        // 首先要判断文件路径，对于http https 路径忽略，对于没有写盘符的路径，加上 targetFile 的路径
        oriFlepath = oriFlepath.replace(/<LB>/g, '(').replace(/<RB>/g, ')');
        let filepath = oriFlepath.trim();
        // 首先要判断文件路径，对于http https 路径忽略，对于没有写盘符的路径，加上 targetFile 的路径
        if (/^http:|https:/.test(filepath)) {
            tmpPicArrNet.push(filepath);
        } else {
            var tmpFilePath = ""; //全路径
            tmpFilePath = path.resolve(mdfilePath, filepath); // 支持相对目录和绝对路径
            tmpFilePath = decodeURI(tmpFilePath); // 地址可能被转义,需要还原
            if (fs.existsSync(tmpFilePath)) {
                tmpPicArrLocal.push(tmpFilePath);
                tmpOriMapping[tmpFilePath] = oriFlepath; // 原始的本地路径地址
            } else {
                // 图片不存在
                tmpPicArrInvalid.push(filepath);
            }
        }
    }
}


export async function openAndEditMarkdownFile(mdTargetFilePath: string): Promise<vscode.TextEditor | undefined> {
    try {
        // 打开文件
        const doc = await vscode.workspace.openTextDocument(vscode.Uri.file(mdTargetFilePath));
        docTextEditorAfterNewFile = await vscode.window.showTextDocument(doc); // 显示文件
        if(docTextEditorAfterNewFile == null) { return; }
        await docTextEditorAfterNewFile.document.save();
        

    } catch (error) {
        vscode.window.showErrorMessage(`Error opening file: ${error}`);
        return undefined;
    }
}

export function saveRenamedMsg(imageTargetFolder: string): boolean {
    // md文件路径
    if (!fs.existsSync(imageTargetFolder)) {
        // 目标文件夹不存在，尝试创建它
        try {
            fs.mkdirSync(imageTargetFolder, { recursive: true }); // 使用 recursive 选项以创建所有必需的父目录
            console.log(`Created directory: ${imageTargetFolder}`);
        } catch (error) {
            // 创建目录时出错
            console.error(`Failed to create directory: ${imageTargetFolder}`, error);
            throw error; // 重新抛出错误，以便调用者可以处理
        }
    } else {
        console.log(`Directory already exists: ${imageTargetFolder}`);
    }
    mdFileAfterRename = imageTargetFolder; // 内部对象赋值，多个模块共用
    oMdFileAfterRename = path.parse(mdFileAfterRename)
    // docTextEditor_after_rename = vscode.window.activeTextEditor;
    // docPreSelection_after_rename = docTextEditor_after_rename?.selection; // 光标位置
    return true;
}


export async function originFileProduce(update: boolean = false) {



    let mdOriginFile = getOriginMdPath();
    if (!mdOriginFile) {
        vscode.window.showErrorMessage('No file path found for the active document.');
        return ;
    }
    let mdOriginFileFolder = path.dirname(mdOriginFile);
    let mdOriginFileName = path.basename(mdOriginFile);
    let mdFileNameAfterCopy = 'ori_'+mdOriginFileName; // 内部对象赋值，多个模块共用
    mdFileAfterCopy = path.join(mdOriginFileFolder, mdFileNameAfterCopy);


    // 获取工作区的根路径
    let rootPath: string ;
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        // 通常，我们取第一个工作区根路径作为当前文件所属的工作区
        rootPath = workspaceFolders[0].uri.fsPath;
        // 确保当前文件确实在工作区内
        if (!mdOriginFile.startsWith(rootPath)) {
            return '';
        }
    }else {
        return '';
    }
    
    // 构建 .recycle 目录路径
    const recycleImgPath = path.join(rootPath, '.recycle/images'); // 假设 .recycle 在扩展的根目录下

    // 检查 .recycle/images 文件夹是否存在，不存在则创建
    if (update&&fs.existsSync(mdFileAfterCopy)) {
        try {
            // 打开新位置的文件
            await   openAndEditMarkdownFile(mdFileAfterCopy);
                        
            await migrateRenamedImg(recycleImgPath,docTextEditorAfterNewFile);
            console.log(`origin has been existed, drop to directory: ${recycleImgPath}`);
            // await   openAndEditMarkdownFile(mdOriginFile);
        } catch (error) {
            console.error(`Failed to drop duplicate file: ${recycleImgPath}`, error);
            vscode.window.showErrorMessage(`Failed to drop duplicate file: ${error}`);
            return;
        }
    }
    try {

        fs.copyFileSync(mdOriginFile, mdFileAfterCopy) // 内部对象赋值，多个模块共用
        if (docTextEditorAfterNewFile == undefined) {
            return ;
        }
        // 延迟一小段时间以确保焦点正确设置
        await new Promise(resolve => setTimeout(resolve, 100));
        await docTextEditorAfterNewFile.document.save();
        await vscode.window.showTextDocument(docTextEditorAfterNewFile.document)
        // 延迟一小段时间以确保焦点正确设置
        await new Promise(resolve => setTimeout(resolve, 100));
        // let currentEditor = getMdEditor(); // 获取初始活动文本编辑器
        // if(currentEditor == null) { return ; }

        // 如果当前活动编辑器是被移动的文件，则关闭它
  
        // await vscode.window.showTextDocument(currentEditor.document, currentEditor.viewColumn)
        if(update) {
            // await   vscode.commands.executeCommand('workbench.action.closeActiveEditor')
    
            // 打开新位置的文件
            // await   openAndEditMarkdownFile(mdFileAfterCopy);
                        
        }

    } catch (error) {
        // 类型保护
        if (error instanceof Error) {
            vscode.window.showErrorMessage(`Failed to move the Markdown file: ${error.message}`);
        } else {
            vscode.window.showErrorMessage(`Failed to move the Markdown file: ${String(error)}`);
        }
    }

}

export async function saveFileRenamed(textEditor:vscode.TextEditor | undefined,content: string, count: number, selectFlag: boolean = false,cleanFlag: boolean = false) {
    // if (count == 0) {
    //     logger.warn(getLang('uptSucc3'));
    //     return;
    // }
    // if (readonly) {
    //     logger.warn(getLang('uptSucc2', count));
    //     return;
    // }
    // let textEditor = await checkEditor(false)
    if (textEditor == null) { return; }
    if ((content.length > 0||cleanFlag) && textEditor != null) {
        await textEditor.edit((editBuilder: vscode.TextEditorEdit) => {
            let rang: vscode.Range;
            if (selectFlag) {
                // 替换选中的内容
                let r = textEditor?.selection;
                if (r == null) {
                    logger.error(getLang('docSelect'))
                    return;
                }
                rang = r;
            } else {
                const end = new vscode.Position(textEditor?.document.lineCount || 0 + 1, 0);
                rang = new vscode.Range(new vscode.Position(0, 0), end)
            }
            editBuilder.replace(rang, content);
        });
        await new Promise(resolve => setTimeout(resolve, 100));
        await textEditor.document.save();
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    logger.success(getLang('uptSucc', count, path.basename(mdFileAfterCopy)),false);
}


// 检测编辑器是否改变了 active = true 表示点否则表示范围
// export async function checkEditorRenamed(active: boolean) {
//     let editor = docTextEditorAfterCopy;
//     if (editor == null || editor.document.isClosed) {
//         logger.error(getLang('closed'))
//         return;
//     }
//     let uri = editor.document.uri;
//     //vscode.commands.executeCommand<vscode.TextDocumentShowOptions>("vscode.open",uri);
//     let editor2 = await vscode.window.showTextDocument(uri)
//     // .then( editor => { 
//     //     let same = docPreSelection?.active == editor.selection.active
//     //     console.log('opened.....');
//     //  },
//     //error => { console.log(error) });
//     //let now = vscode.window.activeTextEditor;
//     // editor.document.isClosed , 文件可能切换或关闭了 now != editor
//     if (active) {
//         if (!checkSamePos(docPreSelection?.active, editor2.selection.active)) {
//             if (skipSelectChange) {
//                 logger.warn(getLang('posChg'))
//             } else {
//                 logger.error(getLang('posChg') + ',' + getLang('notChg'))
//                 return;
//             }
//         }
//     } else {
//         if (!checkSamePos(docPreSelection?.start, editor2.selection.start) || !checkSamePos(docPreSelection?.end, editor2.selection.end)) {
//             if (skipSelectChange) {
//                 logger.warn(getLang('rangChg'))
//             } else {
//                 logger.error(getLang('rangChg') + ',' + getLang('notChg'))
//                 return;
//             }
//         }
//     }
//     return editor2;
// }


export function getOriginFileName(): string | undefined {
    let mdFilePath = getMdPath();
    if (!mdFilePath) {
        vscode.window.showErrorMessage('No file path found for the active document.');
        return;
    }
    // 构建目标文件路径
    const mdFileName = path.basename(mdFilePath);
    return mdFileName;
}

export function getOriginMdPath(): string | undefined {
    let mdFilePath = getMdPath();
    if (!mdFilePath) {
        vscode.window.showErrorMessage('No file path found for the active document.');
        return;
    }
    return mdFilePath;
    
}
// 转换为相对路径,第一个参数为相对路径，第二个为新的文件全路径
export function convertAbOrRelative(originFile: string) {
    // 默认以 md文件为默认路径
    let newFile = switchPath(originFile,path.isAbsolute(originFile));
    logger.info(`path[${originFile}] convert to [${newFile}]`, false);
    return myEncodeURI(newFile, urlFormatted);
}
export async function convertSelectUrl(selectFlag:boolean= true){
    let fileObj = getImages(selectFlag);
    if(fileObj.content == '')
    {
        return '';
    }
    let fileArr = fileObj.local; // 本地文件上传
    let fileMapping = fileObj.mapping; // 本地原始信息
    let content = fileObj.content;
    //downThread = thread;
    // 对网络图片去重，不必每次下载
    let set = new Set(); 
    fileArr.forEach((item)=> set.add(item)); 
    let uniArr:string[] = Array.from(set) as string[];
    let count=0,len = uniArr.length;
    for(let file of uniArr)
    {
        // 转移到目标路径 
        let imageFile = path.parse(file);
        logger.info(`[${file}] move to [${imageFile}], ${count+1}/${len}`,false);
        try{

            let b = escapeStringRegexp(fileMapping[file]);
            var reg = new RegExp( '!\\[([^\\]]*)\\]\\('+ escapeStringRegexp(fileMapping[file]) +'\\)','ig');
            //转为相对路径
            content =  content.replace(reg,'![$1]('+ convertAbOrRelative(fileMapping[file]) +')'); // 内容替换
            count++;
        }catch(e)
        {
            logger.error('convert error:');
            console.log(e);
        }
    }
    await saveFile(content,count,selectFlag);

}


// 初始化参数，参数保存于 common模块中
export function initPara() {
    clearMsg();
    let extendName = 'easy-markdown-migrate';
    let migrateFlag = vscode.workspace.getConfiguration(extendName).get('openAfterMigrate') as boolean;
    let hasBracket = vscode.workspace.getConfiguration(extendName).get('hasBracket') as string;
    let updateLink = vscode.workspace.getConfiguration(extendName).get('updateLink') as boolean;
    let skipSelectChange = vscode.workspace.getConfiguration(extendName).get('skipSelectChange') as boolean;
    let rename = vscode.workspace.getConfiguration(extendName).get('rename') as boolean;
    let remotePath: string = vscode.workspace.getConfiguration(extendName).get('remotePath') || '<filename>';
    let imageSaveFolder: string = vscode.workspace.getConfiguration(extendName).get('imageSaveFolder') || '<filename>.assets';
    let dlTimeout: number = vscode.workspace.getConfiguration(extendName).get('timeoutDownload') || 10;
    let ulTimeout: number = vscode.workspace.getConfiguration(extendName).get('timeoutUpload') || 10;
    let urlFormatted: boolean = vscode.workspace.getConfiguration(extendName).get('urlFormatted') || true;
    if(dlTimeout<=0) {dlTimeout =10;}
    if(ulTimeout<=0) {ulTimeout =10;}
    //const isAsync: boolean = vscode.workspace.getConfiguration().get('downloadImageInMarkdown.isAsync') as boolean;
    setPara(hasBracket, rename, updateLink,skipSelectChange, imageSaveFolder, remotePath
        ,dlTimeout,ulTimeout,urlFormatted);
    
    imagePathBracket = hasBracket; // 全局变量，用于判断是否需要带括号
    openAfterMigrate = migrateFlag; // 全局变量，用于判断是否需要打开图片
    let file = vscode.window.activeTextEditor?.document.uri.fsPath || '';
    if (!mdCheck(file)) {
        suspendedLogMsg();
        return false;
    }
    return true;
}