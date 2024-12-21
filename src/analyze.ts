import { suspendedLogMsg,analyze } from './utils';



export async function vscAnalyze() {
    // vscode.window.showInformationMessage(getLang('hello'))
    analyze();
    suspendedLogMsg();
}
