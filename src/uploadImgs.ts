import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode';
import { getLang } from './lib/lang';
import {upload,upCheck,suspendedLogMsg} from './utils'


export async function vscUpload(clip:boolean=false) {
    if (!await upCheck()) {
        suspendedLogMsg();
        return;
    }
    await upload(clip);
    suspendedLogMsg();
    // analyze();

}