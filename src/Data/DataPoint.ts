export class DataPoint
{
	lineNumber: string = "";
	detail: string = "";
	id: string = "";
	file: string = "";
	//TODO: Probably make this an array of data points.\
	linkedDataPoint: (DataPoint | undefined) = undefined;
	


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