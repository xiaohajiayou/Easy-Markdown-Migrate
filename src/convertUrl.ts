import { suspendedLogMsg,convertSelectUrl,analyze } from './utils';



export async function vscConvertUrl() {
    // vscode.window.showInformationMessage(getLang('hello'))
    await convertSelectUrl();
    await analyze();
    suspendedLogMsg();
}
