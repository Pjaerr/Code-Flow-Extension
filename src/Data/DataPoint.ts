export class DataPoint {
  lineNumber: string = '';
  detail: string = '';
  id: string = '';
  file: string = '';
  linkedDataPoints: DataPoint[] = [];

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
				${renderLinkedDataPoints(dataPoint.linkedDataPoints)}
			|=======================================|
			
			`;
  };
}

const renderLinkedDataPoints = (linkedDataPoints: DataPoint[]) => {
  if (linkedDataPoints.length > 0) {
    let string = '';

    linkedDataPoints.forEach(point => {
      string += `${point.id} | ${point.file}:${point.lineNumber} \n`;
    });

    return string;
  }

  return 'No Linked Data Points';
};
