import * as vscode from 'vscode';

import { DataPoint } from '../Data/DataPoint';
import { GetDataPoints } from '../Data/Data';
import { getDataPointId } from '../Input/getDataPointId';
import { SetupDiagram } from './diagram';

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

  let datapoint2 = new DataPoint();
  datapoint2.id = 'id2';
  datapoint2.file = 'javascript/testfile2.js';
  datapoint2.lineNumber = '98';
  datapoint2.detail = 'This is another test';

  dataPoints.push(datapoint1);
  dataPoints.push(datapoint2);

  //Call diagram.ts here and open the index.html in a browser window or smth
  SetupDiagram(dataPoints);
};
