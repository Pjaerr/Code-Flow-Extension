import * as vscode from 'vscode';

import { DataPoint } from '../Data/DataPoint';
import { GetDataPoints } from '../Data/Data';

const fs = require('fs');
const opn = require('opn');

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

/**
 * Generates a diagram from the DataPoints and their links in the global state.
 */
export const GenerateDiagram = () => {
  //   let dataPoints = GetDataPoints();

  //   if (dataPoints === undefined || dataPoints.length < 2) {
  //     return;
  //   }

  //! Test Data

  let dataPoints: DataPoint[] = [];

  let datapoint1 = new DataPoint();
  datapoint1.id = 'id1';
  datapoint1.file = 'javascript/testfile.js';
  datapoint1.lineNumber = '45';
  datapoint1.detail = 'This is a test';
  datapoint1.linkedDataPoints = [];

  let datapoint2 = new DataPoint();
  datapoint2.id = 'id2';
  datapoint2.file = 'javascript/testfile2.js';
  datapoint2.lineNumber = '98';
  datapoint2.detail = 'This is another test';
  datapoint2.linkedDataPoints = [datapoint1.id];

  dataPoints.push(datapoint1);
  dataPoints.push(datapoint2);

  let json = 'const dataPoints = ' + JSON.stringify(dataPoints);

  vscode.window.showInformationMessage('Generating Diagram...');

  fs.writeFile(__dirname + '/dataPoints.js', json, function(err: any, data: any) {
    if (err) {
      console.error(err);
    } else {
      vscode.window.showInformationMessage('Diagram has been generated!');
      opn(__dirname + '/diagram.html');
    }
  });
};
