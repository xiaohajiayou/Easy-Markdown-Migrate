import * as vscode from 'vscode';
import {download,showStatus,suspendedLogMsg} from './utils'


export async function vscDownload() {
    await download()
    let docTextEditor = vscode.window.activeTextEditor; // 获取当前活动文本编辑器
    if(docTextEditor == null) { return; }
    // await docTextEditor.document.save();

    showStatus(docTextEditor);
    suspendedLogMsg();
}
export async function vscOriginUpdate() {
    await download(true);
        // 保存当前标签页
    let docTextEditor = vscode.window.activeTextEditor; // 获取当前活动文本编辑器
    if(docTextEditor == null) { return; }
    // await docTextEditor.document.save();

    showStatus(docTextEditor);
    suspendedLogMsg();
}
