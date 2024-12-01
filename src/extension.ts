// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {initPara,vscDownload}  from './utils';
import {vscAnalyze} from './analyze';
import {vscDropFile} from './drop';
import {vscTransfer} from './transfer';
import {vscMove} from './moveImg';
import {vscDeleteImgs} from './deleteImg';
import { vscPaste,vscCrop  } from './copyPaste';
import { vscConvertUrl } from './convertUrl';
import { vscUpload } from './uploadImgs';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, extension "markdown-image-transfer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	/*let disposable = vscode.commands.registerCommand("markdown-image-transfer.helloWorld", async () => {
		let answer = await vscode.window.showInformationMessage("How was your day ?", "good", "bad",)
		if (answer === "bad") {
			vscode.window.showErrorMessage("sorry to hear it", "1", "2","3","4")
		} else {
			console.log({ answer })
			vscode.window.showWarningMessage("sorry to hear it")
		}
	})*/
	//let obj2 = vscode.workspace.getConfiguration('markdown-image-transfer');
	//console.log('globalState',context.globalState.get('markdown-image-transfer.hasBracket'));
	// if(!initPara()){return;} // 从配置中获取初始化参数
	let dispAnalyze = vscode.commands.registerCommand("markdown-image-transfer.analyze", async (textEditor: vscode.TextEditor) => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscAnalyze();

	})
	let dispMoveAll = vscode.commands.registerCommand("markdown-image-transfer.transfer", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscTransfer();
	})
	let dispCrop = vscode.commands.registerCommand("markdown-image-transfer.crop", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscCrop();
	})
	let dispPaste = vscode.commands.registerCommand("markdown-image-transfer.paste", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscPaste();
	})


	let dispDownload = vscode.commands.registerCommand("markdown-image-transfer.download", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscDownload();
	})
	let dispUpload = vscode.commands.registerCommand("markdown-image-transfer.upload", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscUpload();
	})

	let dispMove = vscode.commands.registerCommand("markdown-image-transfer.moveLocalImage", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscMove();
	})
	let dispConvert = vscode.commands.registerCommand("markdown-image-transfer.convert", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscConvertUrl();
	})


	let dispClean = vscode.commands.registerCommand("markdown-image-transfer.clean", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscDeleteImgs();
	})
	let dispDropFile = vscode.commands.registerCommand("markdown-image-transfer.drop", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscDropFile();
	})


	context.subscriptions.push(dispAnalyze);
	context.subscriptions.push(dispMoveAll);
	context.subscriptions.push(dispCrop);
	context.subscriptions.push(dispPaste);

	context.subscriptions.push(dispDownload);
	context.subscriptions.push(dispUpload);

	context.subscriptions.push(dispMove);
	context.subscriptions.push(dispConvert);

	context.subscriptions.push(dispClean);
	context.subscriptions.push(dispDropFile);

}

// this method is called when your extension is deactivated
export function deactivate() {}
