import * as vscode from 'vscode';

/**
 * Allow the User to type in information about a DataPoint
 *
 * @return a Promise that resolves a string containing the inputted text
 */
export const getDetailFromUser = () => {
  return new Promise<string>((resolve, reject) => {
    vscode.window
      .showInputBox({ prompt: 'Information about the selected line' })
      .then((result: string | undefined) => {
        result ? resolve(result) : reject('Result was undefined in getDetailFromUser()');
      });
  });
};
