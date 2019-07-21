const fs = require('fs');
import * as vscode from 'vscode';
import { GetDataPointsFromDataStorage } from './DataStorage';

const SaveDataPoints = () => {
  const dataPoints = GetDataPointsFromDataStorage();

  if (dataPoints.length > 0) {
    const options: vscode.SaveDialogOptions = {
      filters: {
        JSON: ['json']
      },
      saveLabel: 'Save'
    };

    vscode.window
      .showSaveDialog(options)
      .then((fileData: { $mid: Number; path: string; scheme: string } | undefined | vscode.Uri) => {
        if (fileData) {
          const filePath = fileData.path;

          fs.writeFile(filePath.slice(1, filePath.length), JSON.stringify(dataPoints), () => {
            vscode.window.showInformationMessage('Saved Data Points at ' + filePath);
          });
        }
      });
  } else {
    vscode.window.showWarningMessage(
      'You must add a Data Point before trying to save them locally!'
    );
  }
};

export default SaveDataPoints;
