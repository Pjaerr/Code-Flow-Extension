import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const addNode = vscode.commands.registerCommand('code-flow.add-node', () => {
    // Triggered via the editor context menu or the command palette when editor has a text selection

    vscode.window.showInformationMessage(
      "Added node to the diagram, run the 'Open digram' command to view the bigger picture."
    );
  });

  const openDiagram = vscode.commands.registerCommand('code-flow.open-diagram', () => {
    // Triggered via the editor context menu or the command palette

    vscode.window.showInformationMessage('Opening diagram');
  });

  context.subscriptions.push(addNode);
  context.subscriptions.push(openDiagram);
}

// this method is called when your extension is deactivated
export function deactivate() {}
