import * as vscode from 'vscode';

//Logic/Data Functionality
import { PushDataPoint } from '../Data/Data';
import { DataPoint } from '../Data/DataPoint';

//Input Functionality
import { getDataPointLineNumber } from './getDataPointLineNumber';
import { getDataPointDetail } from './getDataPointDetail';
import { getDataPointId } from './getDataPointId';
import {getLinkedDataPoint} from './getLinkedDataPoint';


//TODO: Make this code more readable/more "seperated"
export const CreateDataPoint = () =>
{
	let dataPoint = new DataPoint();

	getDataPointLineNumber().then(res => dataPoint.lineNumber = res)
		.then(getDataPointDetail).then(res => dataPoint.detail = res)
		.then(getDataPointId).then(res => dataPoint.id = res)
		.then(getLinkedDataPoint).then(res => dataPoint.linkedDataPoint = res)
		.then(() =>
		{
			if (vscode.window.activeTextEditor !== undefined)
			{
				dataPoint.file = vscode.workspace.asRelativePath(vscode.window.activeTextEditor.document.fileName);
			}
			
			PushDataPoint(dataPoint);

			vscode.window.showInformationMessage("Added data point with ID: " + dataPoint.id);
		})
		.catch(err => console.error(err));
};





