import * as vscode from 'vscode';

const AskUserForInput = async (prompt: string, options?: string[]) => {
  let response;

  if (options) {
    response = await vscode.window.showQuickPick(options, { placeHolder: prompt });
  } else {
    response = await vscode.window.showInputBox({ prompt });
  }

  return response;
};

export default AskUserForInput;
