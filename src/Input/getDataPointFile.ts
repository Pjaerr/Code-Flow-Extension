import * as vscode from 'vscode';

export const getDataPointFile = () =>
{
	return new Promise<string>((resolve, reject) =>
	{
		//TODO: This doesn't work
		if (vscode.window.activeTextEditor === undefined)
		{
			reject("No active text editor open to grab data point file from");
			return;
		}

		resolve(vscode.workspace.asRelativePath(vscode.window.activeTextEditor.document.fileName));
	});
};