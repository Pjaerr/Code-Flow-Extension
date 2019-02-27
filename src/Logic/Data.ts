
export class DataPoint
{
	constructor(lineNumber: string, dataPointDetail: string, dataPointID: string)
	{
		this.lineNumber = lineNumber;
		this.dataPointDetail = dataPointDetail;
	}

	lineNumber: string = "";
	dataPointDetail: string = "";
	dataPointID:string  = "";
}

let dataPoints: DataPoint[] = [];

/**
	 * Adds a line object to the array of data.
	 *
	 * @param line The line object.
 */
export const PushDataPoint = (line: DataPoint) =>
{
	dataPoints.push(line);
};