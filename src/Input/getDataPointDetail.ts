import * as vscode from 'vscode';

export const getDataPointDetail = () =>
{
	return new Promise((resolve, reject) =>
	{
		vscode.window.showInputBox({ prompt: "Information about the selected line" })
			.then((result: (string | undefined)) =>
			{
				result !== undefined ? resolve(result) : reject("Result was undefined in getDataPointDetail()");
			});
	});
};