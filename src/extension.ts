import * as vscode from 'vscode';

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

const OnExtensionLoad = () => {};

export function deactivate() {}
