import { Memento } from 'vscode';

import DataPoint from './DataPoint';

let Storage: Memento | null = null;

//TODO:
/*
  The GlobalState stuff, instead of taking an extension context, let them take a class
  that implements vscode.Memento so that in actual extension usage we can pass in
  ExtensionContext.globalState but in the tests we can mock a vscode.Memento instance
  that just stores to internal state. Keep in mind that we are testing the functionality
  of GlobalState.ts, not the actual vs code apis so it doesn't matter that it isn't
  storing stuff in the actual ExtensionContext.globalState within the test.

  * Probably also want to rename this whole thing from GlobalState to DataStorage
 */

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

// /**
//  * Grabs the DataPoint array from global state.
//  *
//  * @return An array of DataPoints or undefined if none exist.
//  */
// export const GetDataPointsFromGlobalState = () => {
//   if (ExtensionContext === null) {
//     throw new Error('You must call InitialiseGlobalState() before trying to use it.');
//   }

//   let DataPoints: DataPoint[] | undefined = ExtensionContext.globalState.get('DataPoints');

//   return DataPoints;
// };

// /**
//  * Grabs the DataPoint array from global state.
//  *
//  * @return An array of DataPoints or undefined if none exist.
//  */
// export const GetDataPointByOrderIdFromGlobalState = (orderId: number) => {
//   const dataPoints = GetDataPointsFromGlobalState();

//   if (!dataPoints) {
//     throw Error('No DataPoints in the global state.');
//   }

//   for (let point of dataPoints) {
//     if (point.orderId === orderId) {
//       return point;
//     }
//   }

//   throw Error('orderId must exist on a DataPoint');
// };
