import * as vscode from 'vscode';

import Editor from './Editor';

const AddDataPoint = () => {
  try {
    const editor = Editor.fromTextEditor(vscode.window.activeTextEditor);
  } catch (error) {
    vscode.window.showErrorMessage(error.message);
  }
};

export default AddDataPoint;
