import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode';
import { getLang } from './lib/lang';
import {cropContent,pasteContent,migrateFile,analyze,showStatus,openAndEditMarkdownFile,suspendedLogMsg,logger,migrateImg} from './utils'


export async function vscCrop() {

    // await migrateImg(imageTargetFolder);
    // await migrateFile(localFolder);
    await cropContent(true);
    suspendedLogMsg();
}

export async function vscPaste() {
    await pasteContent(true);
    analyze();
    suspendedLogMsg();
}

