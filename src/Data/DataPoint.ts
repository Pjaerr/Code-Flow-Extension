export class DataPoint
{
	lineNumber: string;
	detail: string;
	id: string;
	file: string;
	linkedDataPoint: (DataPoint | undefined);

	constructor(lineNumber = "", detail = "", id = "", file = "", linkedDataPoint: (DataPoint | undefined) = undefined)
	{
		this.lineNumber = lineNumber;
		this.detail = detail;
		this.id = id;
		this.file = file;
		this.linkedDataPoint = linkedDataPoint;
	}

	static getStringRepresentation = (dataPoint: DataPoint) =>
	{
		return(`
			|=======================================
			|	ID: ${dataPoint.id}					
			|	------------------------------------
			|	Line Number: ${dataPoint.lineNumber}
			|	Detail: ${dataPoint.detail}
			|	File: ${dataPoint.file}		
			|	Linked Data Point: ${dataPoint.linkedDataPoint ? dataPoint.linkedDataPoint.id : "No Link"}
			|=======================================
			
			`
		);
	}
}