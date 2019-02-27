import * as vscode from 'vscode';

export const getDataPointId = () =>
{
	return new Promise((resolve, reject) =>
	{
		vscode.window.showInputBox({ prompt: "ID for the selected line. (Used to link to other lines)" })
			.then((result: (string | undefined)) =>
			{
				result !== undefined ? resolve(result) : reject("Result was undefined in getDataPointId()");
			});
	});
};