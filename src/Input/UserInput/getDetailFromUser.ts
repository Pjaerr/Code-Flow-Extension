import * as vscode from 'vscode';

export const getDetailFromUser = () => {
  return new Promise<string>((resolve, reject) => {
    vscode.window
      .showInputBox({ prompt: 'Information about the selected line' })
      .then((result: string | undefined) => {
        result ? resolve(result) : reject('Result was undefined in getDetailFromUser()');
      });
  });
};
