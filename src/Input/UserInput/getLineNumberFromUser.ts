import * as vscode from 'vscode';

import { isANumber } from '../../Utils/isANumber';

/**
 * Allow the user to enter a line number from the given file.
 *
 * @return a Promise that resolves an inputted number.
 */
export const GetLineNumberFromUser = () => {
  return new Promise<string>((resolve, reject) => {
    vscode.window
      .showInputBox({ prompt: 'Line Number', validateInput: isANumber })
      .then((result: string | undefined) => {
        result ? resolve(result) : reject('Result was undefined in getLineNumberFromUser()');
      });
  });
};
