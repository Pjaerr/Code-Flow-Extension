import * as vscode from 'vscode';

import { InitialiseData } from './Data/Data';
import { CreateDataPoint, AddAdditionalLinkToDataPoint } from './Input/Input';
import { ShowDataPoints, GenerateDiagram } from './Output/Output';
import { isFileOpen } from './Utils/isFileOpen';

export function activate(context: vscode.ExtensionContext) {
  InitialiseData(context);

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.codeflow', OnExtensionLoad)
  );
}

const enum CommandOption {
  AddDataPoint = 'Add Data Point',
  AddAdditionalLink = 'Add Additional Link To Existing Data Point',
  ShowDataPoints = 'Show Data Points',
  GenerateDiagram = 'Generate Diagram'
}

const OnExtensionLoad = () => {
  if (!isFileOpen()) {
    vscode.window.showErrorMessage('You must have a file open to use this extension');
    return;
  }

  vscode.window
    .showQuickPick([
      CommandOption.AddDataPoint,
      CommandOption.ShowDataPoints,
      CommandOption.AddAdditionalLink,
      CommandOption.GenerateDiagram
    ])
    .then((selection: string | undefined) => {
      if (selection === undefined) {
        return;
      }

      switch (selection) {
        case CommandOption.AddDataPoint:
          CreateDataPoint();
          break;
        case CommandOption.ShowDataPoints:
          ShowDataPoints();
          break;
        case CommandOption.AddAdditionalLink:
          AddAdditionalLinkToDataPoint();
          break;
        case CommandOption.GenerateDiagram:
          GenerateDiagram();
          break;
      }
    });
};

export function deactivate() {}
