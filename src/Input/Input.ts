import * as vscode from 'vscode';

//Logic/Data Functionality
import { PushDataPoint } from '../Data/Data';
import { DataPoint } from '../Data/DataPoint';

//Input Functionality
import { getDataPointLineNumber } from './getDataPointLineNumber';
import { getDataPointDetail } from './getDataPointDetail';
import { getDataPointId } from './getDataPointId';


//TODO: Make this code more readable/more "seperated"
export const createDataPoint = () =>
{
	let dataPoint = new DataPoint();

	getDataPointLineNumber().then(res => dataPoint.lineNumber = res.toString())
		.then(getDataPointDetail).then(res => dataPoint.detail = res.toString())
		.then(getDataPointId).then(res => dataPoint.id = res.toString())
		.then(() =>
		{
			PushDataPoint(dataPoint);

			vscode.window.showInformationMessage("Added data point with ID: " + dataPoint.id);
		})
		.catch(err => console.error(err));
};





