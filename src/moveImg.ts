import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode';
import { getLang } from './lib/lang';
import { suspendedLogMsg,moveImg ,analyze} from './utils';
// 主要内部变量
// let mdFile = ''; // 需要处理的文件
// let localFolder = ''; // 新的文件夹
// let overwriteFile = false; // 是否覆盖原先的md文件
// let rename = false; // 是否对所有的图片重新命名

export async function vscMove() {
    const result = await vscode.window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
        openLabel: getLang('moveHint')
    });

    if (!result || result.length === 0) {
        return;
    }

    let localFolder: string = result[0].fsPath;
    console.log(`Will Move images to localFolder[${localFolder}]`)                            
    await moveImg(localFolder,true);
    await analyze();
    suspendedLogMsg();
}
