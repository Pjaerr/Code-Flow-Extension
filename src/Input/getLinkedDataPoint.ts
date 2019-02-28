import * as vscode from 'vscode';

import {DataPoint} from '../Data/DataPoint';
import {GetDataPoints} from '../Data/Data';

class SelectableDataPoint implements vscode.QuickPickItem
{
	label: string;
	dataPoint: (DataPoint | undefined);

	constructor(dataPoint: (DataPoint | undefined) = undefined, label: (string | undefined) = undefined)
	{
		this.dataPoint = dataPoint;

		if (label === undefined || dataPoint === undefined)
		{
			this.label = "No Link";
		}
		else
		{
			this.label = `${dataPoint.id} | ${dataPoint.file}:${dataPoint.lineNumber}`;
		}
	}
}

export const getLinkedDataPoint = () =>
{
	return new Promise((resolve, reject) =>
	{
		let dataPoints = GetDataPoints();

		if (dataPoints === undefined)
		{
			reject("Data Points is undefined");
			
			return;
		}

		let selectableDataPoints: SelectableDataPoint[] = [];

		selectableDataPoints.push(new SelectableDataPoint());

		dataPoints.forEach(point => {
			selectableDataPoints.push(new SelectableDataPoint(point));
		});

		let customQuickPick = vscode.window.createQuickPick<SelectableDataPoint>();
		
		
		customQuickPick.show(selectableDataPoints, {placeHolder: "Select another Data Point to link to"})
		.then((selection: (string | undefined)) =>
		{
			resolve(selection);
		});

		// vscode.window.showQuickPick(dataPointIds, {placeHolder: "Select another Data Point to link to"})
		// .then((selection: (string | undefined)) =>
		// {
		// 	resolve(selection);
		// });
	});
}