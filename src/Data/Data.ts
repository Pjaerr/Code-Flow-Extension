import { ExtensionContext } from 'vscode';
import { DataPoint } from './DataPoint';

let ExtensionContext: ExtensionContext;

export const InitialiseData = (context: ExtensionContext) => {
  ExtensionContext = context;
  ExtensionContext.globalState.update('DataPoints', []);
};

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

export const GetDataPoints = () => {
  let DataPoints: DataPoint[] | undefined = ExtensionContext.globalState.get('DataPoints');

  return DataPoints ? DataPoints : undefined;
};
