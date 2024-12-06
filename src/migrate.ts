import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode';
import { getLang } from './lib/lang';
import {migrateFile,suspendedLogMsg,migrateImg} from './utils'


export async function vscMigrate() {
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
    console.log(`Will Move md_file&&images to localFolder[${localFolder}]`)

    let imageTargetFolder = path.join(localFolder, 'images');
    // 检查目标文件夹是否存在
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

    await migrateImg(imageTargetFolder);
    await migrateFile(localFolder);
    suspendedLogMsg();
}
