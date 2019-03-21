import * as vscode from 'vscode';

import { PushDataPoint, GetDataPointFromGUID } from '../Data/Data';
import { DataPoint } from '../Data/DataPoint';

import { GetDataPointFromUser, GetLinkedDataPointFromUser } from './UserInput/GetDataPointFromUser';

/**
 * Asynchronous function that adds an additional link to an existing DataPoint and updates
 * it on the global state.
 */
export async function AddAdditionalLinkToDataPoint() {
  let currentDataPoint = await GetDataPointFromUser();

  if (currentDataPoint !== undefined) {
    let linkedDataPoints: DataPoint[] = currentDataPoint.linkedDataPoints.map(dataPointGuid => {
      return GetDataPointFromGUID(dataPointGuid);
    });

    let newLinkedDataPoint = await GetLinkedDataPointFromUser([
      currentDataPoint,
      ...linkedDataPoints
    ]);

    if (newLinkedDataPoint) {
      currentDataPoint.linkedDataPoints.push(newLinkedDataPoint.id);
    }

    PushDataPoint(currentDataPoint);
    vscode.window.showInformationMessage(
      'Added addtional link to Data Point: ' + currentDataPoint.id
    );
  }
}
