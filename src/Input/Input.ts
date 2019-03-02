import * as vscode from 'vscode';

//Logic/Data Functionality
import { PushDataPoint } from '../Data/Data';
import { DataPoint } from '../Data/DataPoint';

//Input Functionality
import { getDataPointLineNumber } from './getDataPointLineNumber';
import { getDataPointDetail } from './getDataPointDetail';
import { getDataPointId } from './getDataPointId';
import { getLinkedDataPoint } from './getLinkedDataPoint';
import { getDataPointFile } from './getDataPointFile';

export const CreateDataPoint = () => {
  let dataPoint = new DataPoint();

  getDataPointLineNumber()
    .then(lineNumber => (dataPoint.lineNumber = lineNumber))
    .then(getDataPointDetail)
    .then(detail => (dataPoint.detail = detail))
    .then(getDataPointId)
    .then(id => (dataPoint.id = id))
    .then(() => getLinkedDataPoint())
    .then(linkedDataPoint => {
      if (linkedDataPoint !== undefined) {
        dataPoint.linkedDataPoints.push(linkedDataPoint);
      }
    })
    .then(getDataPointFile)
    .then(file => (dataPoint.file = file))
    .then(() => {
      PushDataPoint(dataPoint);

      vscode.window.showInformationMessage('Added data point with ID: ' + dataPoint.id);
    })
    .catch(err => console.error(err));
};

export const AddAdditionalLinkToDataPoint = () => {
  let existingLinkedDataPoints: DataPoint[] = [];

  getLinkedDataPoint().then(currentDataPoint => {
    if (currentDataPoint !== undefined) {
      currentDataPoint.linkedDataPoints.forEach(point => {
        existingLinkedDataPoints.push(point);
      });

      getLinkedDataPoint([currentDataPoint, ...existingLinkedDataPoints]).then(
        newLinkedDataPoint => {
          if (newLinkedDataPoint) {
            currentDataPoint.linkedDataPoints.push(newLinkedDataPoint);
          }

          PushDataPoint(currentDataPoint);
        }
      );
    }
  });
};
