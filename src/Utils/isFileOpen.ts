import * as vscode from 'vscode';

/**
	 * Checks if a file is currently open.
	 *
	 * @return A boolean: true if a file is currently open.
 */
export const isFileOpen = () =>
{
    if (vscode.window.activeTextEditor)
    {
        return vscode.window.activeTextEditor.document.fileName !== "tasks";
    }

    return false;
};