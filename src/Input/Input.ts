import * as vscode from 'vscode';

import {DataPoint, PushDataPoint} from '../Logic/Data';

import {getLineNumber} from './getLineNumber';
import {getDataPointDetail} from './getDataPointDetail';
import {getDataPointId} from './getDataPointId';

let dataPoint = new DataPoint();

export const InitialiseInput = () =>
{
	getDataPoint();
};

const getDataPoint = () =>
{
	getLineNumber().then(res => dataPoint.lineNumber = res.toString())
		.then(getDataPointDetail).then(res => dataPoint.dataPointDetail = res.toString())
		.then(getDataPointId).then(res => dataPoint.dataPointID = res.toString())
		.then(() =>
		{
			PushDataPoint(dataPoint);

			vscode.window.showInformationMessage("Added data point.");
		})
		.catch(err => console.error(err));
};





