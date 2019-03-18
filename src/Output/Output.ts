import * as vscode from 'vscode';
import { DataPoint } from '../Data/DataPoint';
import { ConstructWebview } from './ConstructWebview';

let dataPoints: DataPoint[] = [];

//! Temporary test data
import testData from './testData';

/**
 * Generates a diagram from the DataPoints and their links in the global state.
 */
export const GenerateDiagram = () => {
  //   dataPoints = GetDataPoints();

  //   if (dataPoints === undefined || dataPoints.length < 2) {
  //     return;
  //   }

  //! Start Test Data
  dataPoints = testData;
  //! End Test Data

  vscode.window.showInformationMessage('Generating Diagram...');
  ConstructWebview('Code Flow Diagram', dataPoints).then(webview => {
    vscode.window.showInformationMessage('Diagram Generated');
  });
};
