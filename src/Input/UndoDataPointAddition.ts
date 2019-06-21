import * as vscode from 'vscode';
import { RemoveLastDataPointFromDataStorage } from '../Data/DataStorage';

/**
 * Remove the last data point from Data Storage and let the user know what has happened.
 */
const UndoDataPointAddition = () => {
  try {
    RemoveLastDataPointFromDataStorage();

    vscode.window.showInformationMessage('Removed the last Data Point!');
  } catch (e) {
    vscode.window.showInformationMessage(e.message);
  }
};

export default UndoDataPointAddition;
