import * as vscode from 'vscode';

import { isANumber } from '../Utils/ValidateInput';

export const getLineNumber = () =>
{
	return new Promise((resolve, reject) =>
	{
		vscode.window.showInputBox({ prompt: "Line Number", validateInput: isANumber })
			.then((result: (string | undefined)) =>
			{
				result !== undefined ? resolve(result) : reject("Result was undefined in getLineNumber()");
			});
	});
};