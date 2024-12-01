import * as fs from 'fs';
import * as path from 'path';
import { getLang } from './lib/lang';
import * as vscode from 'vscode';
import { suspendedLogMsg,analyze } from './utils';



export async function vscAnalyze() {
    // vscode.window.showInformationMessage(getLang('hello'))
    analyze();
    suspendedLogMsg();
}
