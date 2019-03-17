import * as vscode from 'vscode';

import { PushDataPoint } from '../Data/Data';
import { DataPoint } from '../Data/DataPoint';

import { getLineNumberFromUser } from './UserInput/getLineNumberFromUser';
import { getDetailFromUser } from './UserInput/getDetailFromUser';
import { getDataPointFromUser, getLinkedDataPointFromUser } from './UserInput/getDataPointFromUser';

import { generateDataPointId } from './generateDataPointId';
import { getActiveFile } from './getActiveFile';

export async function CreateDataPoint() {
  let dataPoint = new DataPoint();

  dataPoint.lineNumber = await getLineNumberFromUser();
  dataPoint.detail = await getDetailFromUser();
  dataPoint.id = await generateDataPointId();

  let linkedDataPoint = await getLinkedDataPointFromUser();

  if (linkedDataPoint !== undefined) {
    dataPoint.linkedDataPoints.push(linkedDataPoint);
  }

  dataPoint.file = await getActiveFile();

  PushDataPoint(dataPoint);
  vscode.window.showInformationMessage('Added data point with ID: ' + dataPoint.id);
}

export async function AddAdditionalLinkToDataPoint() {
  let currentDataPoint = await getDataPointFromUser();

  if (currentDataPoint !== undefined) {
    let newLinkedDataPoint = await getLinkedDataPointFromUser([
      currentDataPoint,
      ...currentDataPoint.linkedDataPoints
    ]);

    if (newLinkedDataPoint) {
      currentDataPoint.linkedDataPoints.push(newLinkedDataPoint);
    }

    PushDataPoint(currentDataPoint);
    vscode.window.showInformationMessage(
      'Added addtional link to Data Point: ' + currentDataPoint.id
    );
  }
}
