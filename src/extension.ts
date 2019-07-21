import * as vscode from 'vscode';

import AddDataPoint from './Input/AddDataPoint';
import GenerateDiagram from './Output/GenerateDiagram';
import LoadDataPoints from './Data/LoadDataPoints';
import SaveDataPoints from './Data/SaveDataPoints';
import UndoDataPointAddition from './Input/UndoDataPointAddition';
import { InitialiseDataStorage } from './Data/DataStorage';

export function activate(context: vscode.ExtensionContext) {
  InitialiseDataStorage(context.globalState);

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.codeflow', OnExtensionLoad)
  );
}

const enum CommandOption {
  AddDataPoint = 'Add Data Point',
  GenerateDiagram = 'Generate Diagram',
  LoadDataPointsFromFile = 'Load Data Points from an existing file',
  SaveDataPointsToFile = 'Save your Data Points to file',
  UndoDataPointAddition = 'Undo the last Data Point addition'
}

const OnExtensionLoad = async () => {
  const selectedOption = await vscode.window.showQuickPick(
    [
      CommandOption.AddDataPoint,
      CommandOption.GenerateDiagram,
      CommandOption.LoadDataPointsFromFile,
      CommandOption.SaveDataPointsToFile,
      CommandOption.UndoDataPointAddition
    ],
    { placeHolder: 'What do you want to do?' }
  );

  switch (selectedOption) {
    case CommandOption.AddDataPoint:
      AddDataPoint();
      break;
    case CommandOption.GenerateDiagram:
      GenerateDiagram();
      break;
    case CommandOption.LoadDataPointsFromFile:
      LoadDataPoints();
      break;
    case CommandOption.SaveDataPointsToFile:
      SaveDataPoints();
      break;
    case CommandOption.UndoDataPointAddition:
      UndoDataPointAddition();
      break;
  }
};

export function deactivate() {}
