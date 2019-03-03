import { DataPoint } from '../Data/DataPoint';

let data: DataPoint[] = [];

//GET DATA INTO HERE SOMEHOW

export const SetupDiagram = (dataPoints: DataPoint[]) => {
  data = dataPoints;
  //Call d3 functions here to do the stuff
};
