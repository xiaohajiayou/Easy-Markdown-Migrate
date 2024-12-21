import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode';
import {copyContentToClipboard,copyContent,pasteContent,analyze,suspendedLogMsg,getOriginMdPath,moveImg,cleanWithSelectedLinks} from './utils'


export async function vscCopy() {

    // await migrateImg(imageTargetFolder);
    // await migrateFile(localFolder);
    await copyContent(true);
    suspendedLogMsg();
}
export async function vscCopyToClipboard() {

    // await migrateImg(imageTargetFolder);
    // await migrateFile(localFolder);
    await copyContentToClipboard(true);
    suspendedLogMsg();
}

export async function vscCut() {

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
            return '';
        }
    }else {
        return '';
    }
    
    // 构建 .recycle 目录路径
    const recycleImgPath = path.join(rootPath, '.recycle/images'); // 假设 .recycle 在扩展的根目录下

    // 检查 .recycle/images 文件夹是否存在，不存在则创建
    if (!fs.existsSync(recycleImgPath)) {
        try {
            fs.mkdirSync(recycleImgPath, { recursive: true });
            console.log(`Created directory: ${recycleImgPath}`);
        } catch (error) {
            console.error(`Failed to create directory: ${recycleImgPath}`, error);
            vscode.window.showErrorMessage(`Failed to create .recycle directory: ${error}`);
            return;
        }
    }
    await moveImg(recycleImgPath,true);
    await cleanWithSelectedLinks('cut');
    // await cutContent(recycleImgPath,true);
    suspendedLogMsg();
}

export async function vscPaste() {
    await pasteContent(true);
    await analyze();
    suspendedLogMsg();
}

