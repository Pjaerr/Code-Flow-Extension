const fs = require('fs');
import * as vscode from 'vscode';
import DataPoint from './DataPoint';
import { ClearDataStorage, PushDataPointToDataStorage } from './DataStorage';

const LoadDataPoints = async () => {
  const options: vscode.OpenDialogOptions = {
    canSelectMany: false,
    filters: {
      JSON: ['json']
    },
    openLabel: 'Load File'
  };

  const fileData = await vscode.window.showOpenDialog(options);

  if (fileData) {
    const filePath = fileData[0].path.slice(1, fileData[0].path.length);

    fs.readFile(filePath, (err: Error, data: string) => {
      if (err) {
        throw err;
      }

      if (data) {
        let dataAsJson: DataPoint[];
        try {
          dataAsJson = JSON.parse(data);

          ClearDataStorage();

          dataAsJson.forEach(dataPoint => {
            if (dataPoint.orderId === null || dataPoint.orderId === undefined) {
              throw new Error();
            }

            PushDataPointToDataStorage(dataPoint);
            vscode.window.showInformationMessage(`Pushing ${dataPoint.name} to Data Storage`);
          });
        } catch {
          vscode.window.showErrorMessage("File isn't valid json format!");
          return;
        }
      }
    });
  }
};

export default LoadDataPoints;
