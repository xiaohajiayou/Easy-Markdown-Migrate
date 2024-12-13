// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {initPara}  from './utils';
import {vscAnalyze} from './analyze';
import {vscDropFile} from './drop';
import {vscMigrate} from './migrate';
import {vscMove} from './moveImg';
import {vscDeleteImgs} from './deleteImg';
import { vscPaste,vscCut,vscCopy,vscCopyToClipboard  } from './copyPaste';
import { vscConvertUrl } from './convertUrl';
import { vscUploadRelease,vscReleaseModify } from './uploadImgs';
import { vscDownload,vscOriginUpdate} from './downloadImgs';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, extension "easy-markdown-migrate" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	/*let disposable = vscode.commands.registerCommand("easy-markdown-migrate.helloWorld", async () => {
		let answer = await vscode.window.showInformationMessage("How was your day ?", "good", "bad",)
		if (answer === "bad") {
			vscode.window.showErrorMessage("sorry to hear it", "1", "2","3","4")
		} else {
			console.log({ answer })
			vscode.window.showWarningMessage("sorry to hear it")
		}
	})*/
	//let obj2 = vscode.workspace.getConfiguration('easy-markdown-migrate');
	//console.log('globalState',context.globalState.get('easy-markdown-migrate.hasBracket'));
	// if(!initPara()){return;} // 从配置中获取初始化参数
	let dispAnalyze = vscode.commands.registerCommand("easy-markdown-migrate.analyze", async (textEditor: vscode.TextEditor) => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscAnalyze();

	})
	let dispMoveAll = vscode.commands.registerCommand("easy-markdown-migrate.migrate", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscMigrate();
	})
	let dispCopy = vscode.commands.registerCommand("easy-markdown-migrate.copy", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscCopy();
	})
	let dispCopyToClipboard = vscode.commands.registerCommand("easy-markdown-migrate.copyToClipboard", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscCopyToClipboard();
	})
	let dispCut = vscode.commands.registerCommand("easy-markdown-migrate.cut", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscCut();
	})
	let dispPaste = vscode.commands.registerCommand("easy-markdown-migrate.paste", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscPaste();
	})


	let dispDownload = vscode.commands.registerCommand("easy-markdown-migrate.downloadUpdateOrigin", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscOriginUpdate();
	})
	let dispUpdateOrigin = vscode.commands.registerCommand("easy-markdown-migrate.download", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscDownload();
	})
	let dispUploadRelease = vscode.commands.registerCommand("easy-markdown-migrate.uploadRelease", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscUploadRelease();
	})
	let dispUploadModify = vscode.commands.registerCommand("easy-markdown-migrate.uploadModify", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscReleaseModify();
	})

	let dispMove = vscode.commands.registerCommand("easy-markdown-migrate.moveImage", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscMove();
	})
	let dispConvert = vscode.commands.registerCommand("easy-markdown-migrate.convert", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscConvertUrl();
	})


	let dispClean = vscode.commands.registerCommand("easy-markdown-migrate.deleteImage", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscDeleteImgs();
	})
	let dispDropFile = vscode.commands.registerCommand("easy-markdown-migrate.drop", async () => {
		if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		vscDropFile();
	})


	context.subscriptions.push(dispAnalyze);
	context.subscriptions.push(dispMoveAll);
	context.subscriptions.push(dispCopy);
	context.subscriptions.push(dispCopyToClipboard);
	context.subscriptions.push(dispCut);
	context.subscriptions.push(dispPaste);
	
	context.subscriptions.push(dispDownload);
	context.subscriptions.push(dispUploadRelease);
	context.subscriptions.push(dispUpdateOrigin);
	context.subscriptions.push(dispUploadModify);

	context.subscriptions.push(dispMove);
	context.subscriptions.push(dispConvert);

	context.subscriptions.push(dispClean);
	context.subscriptions.push(dispDropFile);

}

// this method is called when your extension is deactivated
export function deactivate() {}
