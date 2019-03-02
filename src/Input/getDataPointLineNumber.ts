import * as vscode from 'vscode';

import { isANumber } from '../Utils/ValidateInput';

export const getDataPointLineNumber = () => {
	return new Promise<string>((resolve, reject) => {
		vscode.window.showInputBox({ prompt: "Line Number", validateInput: isANumber })
			.then((result: (string | undefined)) => {
				result ? resolve(result) : reject("Result was undefined in getLineNumber()");
			});
	});
};