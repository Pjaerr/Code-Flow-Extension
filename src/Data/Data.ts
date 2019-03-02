import { ExtensionContext } from "vscode";
import { DataPoint } from './DataPoint';

let ExtensionContext: ExtensionContext;

export const InitialiseData = (context: ExtensionContext) =>
{
	ExtensionContext = context;
	ExtensionContext.globalState.update("DataPoints", []);
};

export const PushDataPoint = (dataPoint: DataPoint) =>
{
	let currentDataPoints: (DataPoint[] | undefined) = ExtensionContext.globalState.get("DataPoints");

	if (currentDataPoints)
	{
		currentDataPoints.push(dataPoint);

		ExtensionContext.globalState.update("DataPoints", currentDataPoints);
	}
};

export const GetDataPoints = () =>
{
	let DataPoints: (DataPoint[] | undefined) = ExtensionContext.globalState.get("DataPoints");

	return DataPoints ? DataPoints : undefined;
};