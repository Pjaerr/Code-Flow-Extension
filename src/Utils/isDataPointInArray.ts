import { DataPoint } from '../Data/DataPoint';

export const isDataPointInArray = (arr: DataPoint[], dataPoint: DataPoint) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === dataPoint.id) {
      return true;
    }
  }

  return false;
};
