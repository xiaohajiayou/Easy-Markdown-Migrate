/* eslint-disable @typescript-eslint/naming-convention */
import { window, ProgressLocation } from 'vscode'
import * as vscode from 'vscode'
import * as path from 'path';
import {
    getImages, escapeStringRegexp, saveFile, remotePath,
    rename, convertPath, insertText,
    timeoutPromise,ulTimeout
} from './common';
import { logger } from '../utils';
import { getLang } from './lang';

// 主要内部变量
//var downThread = 1;
let myPicgo: any = null; // picgo对象
let remote = ''; // 是否路径中不增加md文件名的文件夹，默认会自动增加文件夹以将不同md文件的图片分离开


export async function upCheck() {
    try {
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
        logger.error('PicGo init error:');
        console.log(e);
        return false;
    }
    // 需要处理的文件
    // 对MD的结构化
    remote = convertPath(remotePath)
    return true;
}

export async function upload(clipBoard: boolean = false) // ,thread:number
{
    const picgo1 = new myPicgo(); // 将使用默认的配置文件：~/.picgo/config.json
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
    let fileMapping: Record<string, any>;
    let fileArr;
    let content = '';
    if (clipBoard) {
        fileArr = [''];
    } else {
        let fileObj = getImages(true); // 根据选择的内容上传
        fileArr = fileObj.local; // 本地文件上传
        fileMapping = fileObj.mapping; // 本地原始信息
        content = fileObj.content;
        if (fileArr.length == 0) {
            logger.error(getLang('docSelect'))
            return;
        }
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
            progress.report({ increment: count / len * 100, message: getLang('uping2', fileBasename , count, len) });
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
            await saveFile(content, successCount, true);
        }
        rres('finish')
        return Promise.resolve()
        //else return Promise.reject()
    });
    return p;
}

