import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode';
import { getLang } from './lib/lang';
import {copyContent,cutContent,pasteContent,analyze,suspendedLogMsg} from './utils'


export async function vscCopy() {

    // await migrateImg(imageTargetFolder);
    // await migrateFile(localFolder);
    await copyContent(true);
    suspendedLogMsg();
}

export async function vscCut() {

    // await migrateImg(imageTargetFolder);
    // await migrateFile(localFolder);
    await cutContent(true);
    suspendedLogMsg();
}

export async function vscPaste() {
    await pasteContent(true);
    await analyze();
    suspendedLogMsg();
}

