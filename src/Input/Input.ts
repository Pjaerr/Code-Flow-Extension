import * as vscode from 'vscode';

//Logic/Data Functionality
import { PushDataPoint } from '../Data/Data';
import { DataPoint } from '../Data/DataPoint';

//Input Functionality
import { getDataPointLineNumber } from './getDataPointLineNumber';
import { getDataPointDetail } from './getDataPointDetail';
import { getDataPointId } from './getDataPointId';
import { getDataPoint, getLinkedDataPoint } from './getDataPoint';
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
  getDataPoint().then(currentDataPoint => {
    if (currentDataPoint !== undefined) {
      getLinkedDataPoint([currentDataPoint, ...currentDataPoint.linkedDataPoints]).then(
        newLinkedDataPoint => {
          if (newLinkedDataPoint) {
            currentDataPoint.linkedDataPoints.push(newLinkedDataPoint);
          }

          PushDataPoint(currentDataPoint);
          vscode.window.showInformationMessage(
            'Added addtional link to Data Point: ' + currentDataPoint.id
          );
        }
      );
    }
  });
};
