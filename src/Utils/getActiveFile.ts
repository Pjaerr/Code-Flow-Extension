import * as vscode from 'vscode';

/**
 * Queries VS Code to get the file that is currently open by the User.
 *
 * @return a Promise that resolves the current active file path.
 */
export const getActiveFile = () => {
  return new Promise<string>((resolve, reject) => {
    if (vscode.window.activeTextEditor) {
      resolve(vscode.workspace.asRelativePath(vscode.window.activeTextEditor.document.fileName));
    } else {
      reject('The active text editor is undefined');
    }
  });
};
