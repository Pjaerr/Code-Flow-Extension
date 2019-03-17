import { GetDataPointFromGUID } from '../Data/Data';

export class DataPoint {
  lineNumber: string = '';
  detail: string = '';
  id: string = '';
  file: string = '';
  linkedDataPoints: string[] = [];

  //This is static as we work with DataPoints returned from vscode global storage which doesn't
  //include functions on an instance of a class.
  static getStringRepresentation = (dataPoint: DataPoint) => {
    return `
			|=======================================|
			ID: ${dataPoint.id}					
			------------------------------------
			File: ${dataPoint.file}
			Line Number: ${dataPoint.lineNumber}	
			Detail: ${dataPoint.detail}	
			Linked Data Points =>
				${renderLinkedDataPointsAsText(dataPoint.linkedDataPoints)}
			|=======================================|
			
			`;
  };
}

const renderLinkedDataPointsAsText = (linkedDataPoints: string[]) => {
  if (linkedDataPoints.length > 0) {
    let string = '';

    linkedDataPoints.forEach(pointGUID => {
      const point = GetDataPointFromGUID(pointGUID);

      string += `${point.id} | ${point.file}:${point.lineNumber} \n`;
    });

    return string;
  }

  return 'No Linked Data Points';
};
