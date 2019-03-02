import * as vscode from 'vscode';

import { DataPoint } from '../Data/DataPoint';
import { GetDataPoints } from '../Data/Data';

let points = new Map<string, DataPoint>();

export const getLinkedDataPoint = () =>
{
	return new Promise<(DataPoint | undefined)>((resolve, reject) =>
	{
		let dataPoints = GetDataPoints();

		if (dataPoints === undefined)
		{
			reject("Data Points is undefined");

			return;
		}

		let selectableDataPoints: string[] = [];

		selectableDataPoints.push("No Link");

		dataPoints.forEach(point =>
		{
			points.set(`${point.id} | ${point.file}:${point.lineNumber}`, point);
			selectableDataPoints.push(`${point.id} | ${point.file}:${point.lineNumber}`);
		});


		vscode.window.showQuickPick(selectableDataPoints, { placeHolder: "Select another Data Point to link to" })
			.then((selection: (string | undefined)) =>
			{
				if (selection)
				{
					resolve(points.get(selection));
				}
				else if (selection === "No Link")
				{
					resolve(undefined);
				}
				else
				{
					reject("Link was undefined");
				}
			});
	});
};