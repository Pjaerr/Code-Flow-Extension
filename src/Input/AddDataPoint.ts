import * as vscode from 'vscode';

import DataPoint from '../Data/DataPoint';
import { PushDataPointToDataStorage } from '../Data/DataStorage';
import Editor from './Editor';
import getCurrentOrderId from '../Utils/getCurrentOrderId';
import AskUserForInput from './AskUserForInput';

/**
 * Get the active file and line number and then a name and some detail from the user;
 * Use this data to create a new Data Point and push it to Data Storage.
 */
const AddDataPoint = async () => {
  try {
    const editor = Editor.fromTextEditor(vscode.window.activeTextEditor);
    const lineNumber = editor.GetActiveLineNumber();

    const file = editor.GetActiveFileName();

    const orderId = getCurrentOrderId();

    const name = await AskUserForInput('Enter a name for this Data Point');

    const detail = await AskUserForInput('Enter some extra information about this Data Point');

    const dataPoint = new DataPoint(lineNumber, name, detail, file, orderId);

    PushDataPointToDataStorage(dataPoint);

    vscode.window.showInformationMessage(`${dataPoint.name} | ${file}:${lineNumber} Created!`);
  } catch (error) {
    vscode.window.showErrorMessage(error.message);
  }
};

export default AddDataPoint;
