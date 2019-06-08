import { ExtensionContext } from 'vscode';
import DataPoint from './DataPoint';

let ExtensionContext: ExtensionContext | null = null;

/**
 * Setups the global state object with a DataPoints array. This must be called before
 * any other function in GlobalState.ts can be used.
 *
 * @param context The ExtensionContext whose globalState will be used.
 */
export const IntialiseGlobalState = (context: ExtensionContext) => {
  ExtensionContext = context;
  ExtensionContext.globalState.update('DataPoints', []);
};

/**
 * Adds a new DataPoint to the global state if it doesn't exist, and updates
 * the existing DataPoint if it does.
 *
 * @param dataPoint The DataPoint to add.
 */
export const PushDataPointToGlobalState = (dataPoint: DataPoint) => {
  if (ExtensionContext === null) {
    throw new Error('You must call InitialiseGlobalState() before trying to use it.');
  }

  let currentDataPoints: DataPoint[] | undefined = ExtensionContext.globalState.get('DataPoints');

  if (currentDataPoints) {
    //If the data point already exists, remove the previous version
    currentDataPoints = currentDataPoints.filter(
      currentDataPoint => currentDataPoint.orderId !== dataPoint.orderId
    );

    currentDataPoints.push(dataPoint);

    ExtensionContext.globalState.update('DataPoints', currentDataPoints);
  }
};

/**
 * Grabs the DataPoint array from global state.
 *
 * @return An array of DataPoints or undefined if none exist.
 */
export const GetDataPointsFromGlobalState = () => {
  if (ExtensionContext === null) {
    throw new Error('You must call InitialiseGlobalState() before trying to use it.');
  }

  let DataPoints: DataPoint[] | undefined = ExtensionContext.globalState.get('DataPoints');

  return DataPoints;
};

/**
 * Grabs the DataPoint array from global state.
 *
 * @return An array of DataPoints or undefined if none exist.
 */
export const GetDataPointByOrderIdFromGlobalState = (orderId: number) => {
  const dataPoints = GetDataPointsFromGlobalState();

  if (!dataPoints) {
    throw Error('No DataPoints in the global state.');
  }

  for (let point of dataPoints) {
    if (point.orderId === orderId) {
      return point;
    }
  }

  throw Error('orderId must exist on a DataPoint');
};
