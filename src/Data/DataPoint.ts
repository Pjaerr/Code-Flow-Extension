export class DataPoint
{
	lineNumber: string;
	detail: string;
	id: string;

	constructor(lineNumber: string = "", detail: string = "", id: string = "")
	{
		this.lineNumber = lineNumber;
		this.detail = detail;
		this.id = id;
	}

	static getStringRepresentation = (dataPoint: DataPoint) =>
	{
		return(`
				ID: ${dataPoint.id}
				---------------
				Line Number: ${dataPoint.lineNumber}
				Detail: ${dataPoint.detail}`
		);
	}
}