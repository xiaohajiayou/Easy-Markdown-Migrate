import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode';
import { getLang } from './lib/lang';
import {cropContent,pasteContent,transferFile,analyze,showStatus,openAndEditMarkdownFile,suspendedLogMsg,logger,transferImg} from './utils'


export async function vscCrop() {

    // await transferImg(imageTargetFolder);
    // await transferFile(localFolder);
    await cropContent(true);
    suspendedLogMsg();
}

export async function vscPaste() {
    await pasteContent(true);
    suspendedLogMsg();
}

