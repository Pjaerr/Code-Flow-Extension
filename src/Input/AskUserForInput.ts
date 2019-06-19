import * as vscode from 'vscode';

/**
 * Asks the user for either text or selection input.
 * @param prompt The message to show the user to prompt them on what to input
 * @param options An optional list of options, if provided the input will be a vscode quick pick
 */
const AskUserForInput = async (prompt: string, options?: string[]) => {
  let response;

  if (options) {
    response = await vscode.window.showQuickPick(options, { placeHolder: prompt });
  } else {
    response = await vscode.window.showInputBox({ prompt });
  }

  if (!response) {
    throw new Error('You must provide input for this extension to work!');
  }

  return response;
};

export default AskUserForInput;
