import { DataPoint } from '../Data/DataPoint';

/**
 * Checks if a DataPoint is inside of an array of DataPoints
 *
 * @param arr An array of DataPoint objects
 * @param dataPoint a single DataPoint object
 * @return a boolean, true if the DataPoint is within the array.
 */
export const isDataPointInArray = (arr: DataPoint[], dataPoint: DataPoint) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === dataPoint.id) {
      return true;
    }
  }

  return false;
};
