import * as vscode from 'vscode';
import { DataPoint } from '../Data/DataPoint';
import { GetDataPoints } from '../Data/Data';

/**
 * Displays all of the DataPoints from the global state onto the VS Code Output window.
 */
export const ShowDataPoints = () => {
  let dataPoints = GetDataPoints();

  if (dataPoints === undefined) {
    return;
  }

  if (dataPoints.length > 0) {
    let AllDataPointsOutputChannel = vscode.window.createOutputChannel('AllDataPoints');

    dataPoints.forEach(point => {
      AllDataPointsOutputChannel.appendLine(DataPoint.getStringRepresentation(point));
    });

    AllDataPointsOutputChannel.show();
  } else {
    vscode.window.showWarningMessage('No Data Points have been added!');
  }
};
