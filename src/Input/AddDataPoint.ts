import * as vscode from 'vscode';

import Editor from './Editor';
import getCurrentOrderId from '../Utils/getCurrentOrderId';
import AskUserForInput from './AskUserForInput';

const AddDataPoint = async () => {
  try {
    const editor = Editor.fromTextEditor(vscode.window.activeTextEditor);
    const lineNumber = editor.GetActiveLineNumber();
    const fileName = editor.GetActiveFileName();
    const orderId = getCurrentOrderId();

    const dataPointName = await AskUserForInput('Enter a name for this Data Point');

    const dataPointDetail = await AskUserForInput(
      'Enter some extra information about this Data Point'
    );
  } catch (error) {
    vscode.window.showErrorMessage(error.message);
  }
};

export default AddDataPoint;
