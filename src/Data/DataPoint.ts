export class DataPoint
{
	lineNumber: string;
	detail: string;
	id: string;
	file: string;
	linkedDataPointId: string;

	constructor(lineNumber: string = "", detail: string = "", id: string = "", file: string = "", linkedDataPointId: string = "")
	{
		this.lineNumber = lineNumber;
		this.detail = detail;
		this.id = id;
		this.file = file;
		this.linkedDataPointId = linkedDataPointId;
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
			|=======================================
			
			`
		);
	}
}