import * as fs from 'fs';
import * as path from 'path';
import { getLang } from './lib/lang';
import * as vscode from 'vscode';
import { suspendedLogMsg,convertSelectUrl,analyze } from './utils';



export async function vscConvertUrl() {
    // vscode.window.showInformationMessage(getLang('hello'))
    await convertSelectUrl();
    await analyze();
    suspendedLogMsg();
}
