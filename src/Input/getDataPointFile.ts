import * as vscode from 'vscode';

export const getDataPointFile = () =>
{
	return new Promise<string>((resolve, reject) =>
	{
		if (vscode.window.activeTextEditor)
		{
			resolve(vscode.workspace.asRelativePath(vscode.window.activeTextEditor.document.fileName));
		}
		else
		{
			reject("The active text editor is undefined");
		}
	});
};