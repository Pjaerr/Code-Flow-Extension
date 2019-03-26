import * as vscode from 'vscode';

import { DataPoint } from '../../Data/DataPoint';
import { GetDataPoints } from '../../Data/Data';
import { isDataPointInArray } from '../../Utils/isDataPointInArray';

let dataPoints: DataPoint[] | undefined = [];

//DataPoint objects mapped to strings to be presented on the user interface
let dataPointsMap: Map<string, DataPoint> = new Map();

/**
 * Sets up the dataPointsMap for each dataPoint
 *
 * @param pointsToExclude An array of DataPoint objects that shouldn't be included in the dataPointsMap
 */
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

/**
 * Asynchronous function that shows a VSCode.QuickPick for a list of DataPoint objects
 *
 * @param placeholder A string to be shown telling the user what the input does
 * @param extraSelectableDataPoints An array of strings that map to the dataPointsMap
 * @return a DataPoint from the dataPointsMap matching the chosen string key
 */
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

/**
 * Let the user choose a DataPoint from all of the DataPoints in the global state.
 *
 * @return A Promise that resolves their chosen DataPoint
 */
export const GetDataPointFromUser = (userInputMessage: string) => {
  return new Promise<DataPoint | undefined>((resolve, reject) => {
    setupDataPoints();
    showQuickPicker(userInputMessage)
      .then(chosenDataPoint => resolve(chosenDataPoint))
      .catch(err => reject(err));
  });
};

/**
 * Let the user choose a DataPoint from all of the DataPoints in the global state excluding
 * an array of chosen DataPoints. To be used when allowing the User to select a link to another
 * DataPoint.
 *
 * @return A Promise that resolves their chosen DataPoint
 */
export const GetLinkedDataPointFromUser = (
  userInputMessage: string,
  pointsToExclude?: DataPoint[]
) => {
  return new Promise<DataPoint | undefined>((resolve, reject) => {
    setupDataPoints(pointsToExclude);
    showQuickPicker(userInputMessage, ['No Link'])
      .then(chosenDataPoint => resolve(chosenDataPoint))
      .catch(err => reject(err));
  });
};
