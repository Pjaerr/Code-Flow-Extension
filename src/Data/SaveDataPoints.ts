const fs = require('fs');
import * as vscode from 'vscode';
import { GetDataPointsFromDataStorage } from './DataStorage';

const SaveDataPoints = async () => {
  const dataPoints = GetDataPointsFromDataStorage();

  if (dataPoints.length > 0) {
    const options: vscode.SaveDialogOptions = {
      filters: {
        JSON: ['json']
      },
      saveLabel: 'Save'
    };

    const fileData = await vscode.window.showSaveDialog(options);

    if (fileData) {
      const filePath = fileData.path;

      fs.writeFile(filePath.slice(1, filePath.length), JSON.stringify(dataPoints), () => {
        vscode.window.showInformationMessage('Saved Data Points at ' + filePath);
      });
    }
  } else {
    vscode.window.showWarningMessage(
      'You must add a Data Point before trying to save them locally!'
    );
  }
};

export default SaveDataPoints;
