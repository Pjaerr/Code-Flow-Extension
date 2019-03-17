import * as vscode from 'vscode';

import { DataPoint } from '../../Data/DataPoint';
import { GetDataPoints } from '../../Data/Data';
import { isDataPointInArray } from '../../Utils/isDataPointInArray';

let dataPoints: DataPoint[] | undefined = [];

let dataPointsMap: Map<string, DataPoint> = new Map();

const setupDataPoints = (pointsToExclude?: DataPoint[]) => {
  dataPoints = [];
  dataPointsMap.clear();

  dataPoints = GetDataPoints();

  if (dataPoints === undefined) {
    return;
  }

  dataPoints.forEach(point => {
    if (pointsToExclude === undefined || !isDataPointInArray(pointsToExclude, point)) {
      dataPointsMap.set(`${point.id} | ${point.file}:${point.lineNumber}`, point);
    }
  });
};

const showQuickPicker = async (placeHolder: string, extraSelectableDataPoints?: string[]) => {
  let selectableDataPoints: string[] = [];

  dataPointsMap.forEach((value, key) => {
    selectableDataPoints.push(key);
  });

  if (extraSelectableDataPoints) {
    selectableDataPoints.push(...extraSelectableDataPoints);
  }

  const chosenDataPoint = await vscode.window.showQuickPick(selectableDataPoints, { placeHolder });

  if (chosenDataPoint) {
    return dataPointsMap.get(chosenDataPoint);
  } else if (chosenDataPoint === 'No Link') {
    return undefined;
  }

  throw Error('Link was undefined');
};

export const getDataPointFromUser = () => {
  return new Promise<DataPoint | undefined>((resolve, reject) => {
    setupDataPoints();
    showQuickPicker('Choose a Data Point')
      .then(chosenDataPoint => resolve(chosenDataPoint))
      .catch(err => reject(err));
  });
};

export const getLinkedDataPointFromUser = (pointsToExclude?: DataPoint[]) => {
  return new Promise<DataPoint | undefined>((resolve, reject) => {
    setupDataPoints(pointsToExclude);
    showQuickPicker('Choose another Data Point to link to', ['No Link'])
      .then(chosenDataPoint => resolve(chosenDataPoint))
      .catch(err => reject(err));
  });
};
