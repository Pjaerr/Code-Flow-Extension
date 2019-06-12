import { Memento } from 'vscode';

import DataPoint from './DataPoint';

let Storage: Memento | null = null;

/**
 * Sets up the Memento object to use as data storage.
 *
 * @param storage The memento object to use.
 */
export const InitialiseDataStorage = (storage: Memento) => {
  Storage = storage;
  Storage.update('DataPoints', []);
};

/**
 * Adds a new DataPoint to the Storage object if it doesn't exist, and updates
 * the existing DataPoint if it does.
 *
 * @param dataPoint The DataPoint to add.
 */
export const PushDataPointToDataStorage = (dataPoint: DataPoint) => {
  if (Storage === null) {
    throw new Error('You must call InitialiseDataStorage() before trying to use it.');
  }

  let currentDataPoints: DataPoint[] | undefined = Storage.get('DataPoints');

  if (currentDataPoints) {
    //If the data point already exists, remove the previous version
    currentDataPoints = currentDataPoints.filter(
      currentDataPoint => currentDataPoint.orderId !== dataPoint.orderId
    );

    currentDataPoints.push(dataPoint);

    Storage.update('DataPoints', currentDataPoints);
  }
};

/**
 * Grabs the DataPoint array from Storage
 *
 * @return An array of DataPoints. Can be an empty array
 */
export const GetDataPointsFromDataStorage = () => {
  if (Storage === null) {
    throw new Error('You must call InitialiseDataStorage() before trying to use it.');
  }

  let DataPoints: DataPoint[] | undefined = Storage.get('DataPoints');

  if (DataPoints === undefined) {
    throw new Error('You must call InitialiseDataStorage() before trying to use it.');
  }

  return DataPoints;
};

/**
 * Grabs a DataPoint from Storage matching a given orderId
 *
 * @param orderId a number matching an existing DataPoint in Storage
 * 
 * @return A DataPoint object
 */
export const GetDataPointByOrderIdFromDataStorage = (orderId: number) => {
  const dataPoints = GetDataPointsFromDataStorage();

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
