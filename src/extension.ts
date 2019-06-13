import * as vscode from 'vscode';

import AddDataPoint from './Input/AddDataPoint';
import GenerateDiagram from './Output/GenerateDiagram';
import UndoDataPointAddition from './Input/UndoDataPointAddition';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.codeflow', OnExtensionLoad)
  );
}

const enum CommandOption {
  AddDataPoint = 'Add Data Point',
  GenerateDiagram = 'Generate Diagram',
  UndoDataPointAddition = 'Undo the last Data Point addition'
}

const OnExtensionLoad = async () => {
  const selectedOption = await vscode.window.showQuickPick(
    [
      CommandOption.AddDataPoint,
      CommandOption.GenerateDiagram,
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
    case CommandOption.UndoDataPointAddition:
      UndoDataPointAddition();
      break;
  }
};

export function deactivate() {}
