import * as vscode from 'vscode';

import {InitialiseInput} from './Input/Input';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('extension.codeflow', OnExtensionLoad));
}

const OnExtensionLoad = () =>
{
	InitialiseInput();
};

export function deactivate() { }
