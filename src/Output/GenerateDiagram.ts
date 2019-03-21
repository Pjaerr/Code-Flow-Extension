import * as vscode from 'vscode';

import { GetDataPoints } from '../Data/Data';
import { ConstructWebview } from './ConstructWebview';

/**
 * Generates a diagram from the DataPoints and their links in the global state.
 */
export const GenerateDiagram = () => {
  const dataPoints = GetDataPoints();

  if (dataPoints === undefined || dataPoints.length < 2) {
    return;
  }

  vscode.window.showInformationMessage('Generating Diagram...');

  ConstructWebview('Code Flow Diagram', dataPoints).then(webview => {
    vscode.window.showInformationMessage('Diagram Generated');
  });
};
