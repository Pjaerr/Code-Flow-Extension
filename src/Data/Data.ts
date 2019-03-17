import { ExtensionContext } from 'vscode';
import { DataPoint } from './DataPoint';

let ExtensionContext: ExtensionContext;

/**
 * Setups the global state object with a DataPoints array
 *
 * @param context The ExtensionContext whose globalState will be used.
 */
export const InitialiseData = (context: ExtensionContext) => {
  ExtensionContext = context;
  ExtensionContext.globalState.update('DataPoints', []);
};

/**
 * Adds a new DataPoint to the global state if it doesn't exist, and updates
 * the existing DataPoint if it does.
 *
 * @param dataPoint The DataPoint to add.
 */
export const PushDataPoint = (dataPoint: DataPoint) => {
  let currentDataPoints: DataPoint[] | undefined = ExtensionContext.globalState.get('DataPoints');

  if (currentDataPoints) {
    //If the data point already exists, remove the previous version
    for (let i = currentDataPoints.length - 1; i > 0; i--) {
      if (currentDataPoints[i].id === dataPoint.id) {
        currentDataPoints.splice(i, 1);
        i = 0;
      }
    }

    currentDataPoints.push(dataPoint);

    ExtensionContext.globalState.update('DataPoints', currentDataPoints);
  }
};

/**
 * Grabs the DataPoint array from global state.
 *
 * @return An array of DataPoints or undefined if none exist.
 */
export const GetDataPoints = () => {
  let DataPoints: DataPoint[] | undefined = ExtensionContext.globalState.get('DataPoints');

  return DataPoints ? DataPoints : undefined;
};

export const GetDataPointFromGUID = (guid: string) => {
  const dataPoints = GetDataPoints();

  if (!dataPoints) {
    throw Error('No DataPoints in the global state.');
  }

  for (let point of dataPoints) {
    if (point.id === guid) {
      return point;
    }
  }

  throw Error('GUID must exist on a DataPoint');
};
