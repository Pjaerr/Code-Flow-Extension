import * as vscode from 'vscode';

import {GetDataPoints, DataPoint} from '../Data/Data';

export const ShowDataPoints = () =>
{
	let dataPoints = GetDataPoints();

	if (dataPoints !== undefined)
	{
		let AllDataPointsOutputChannel: vscode.OutputChannel = vscode.window.createOutputChannel("AllDataPoints");

		dataPoints.forEach(point => {
			AllDataPointsOutputChannel.appendLine(DataPoint.getStringRepresentation(point));
		});

		AllDataPointsOutputChannel.show();
	}
};

export const GenerateDiagram = () =>
{
	//Does all of the WebView D3.js stuff -->
};