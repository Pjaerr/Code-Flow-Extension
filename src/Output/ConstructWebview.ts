import * as vscode from 'vscode';
import { DataPoint } from '../Data/DataPoint';

const readFileAsync = require('util').promisify(require('fs').readFile);

/**
 * Constructs a HTML template string injecting the content from the diagram.js, diagram.css and
 * dataPoints as json as inline script tags so that it can be used in a vscode webview.
 *
 * Relies on files at out/Output/diagram.js and out/Output/diagram.css existing
 *
 * @param dataPoints The array of DataPoint objects to construct the HTML using.
 *
 * @return A Promise that resolves a HTML template string.
 */
async function constructHTML(dataPoints: DataPoint[]) {
  try {
    const dataPointsJS = `const dataPoints = ${JSON.stringify(dataPoints)}`;

    const [diagramJS, diagramCSS] = await Promise.all([
      readFileAsync(__dirname + '/diagram.js'),
      readFileAsync(__dirname + '/diagram.css')
    ]);

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title>CodeFlow Diagram</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            ${diagramCSS}
          </style>
        </head>
        <body>
          <canvas id="canvas"></canvas>
          <script>${dataPointsJS}</script>
          <script>${diagramJS}</script>
        </body>
      </html>
    `;
  } catch (err) {
    throw Error(err);
  }
}

/**
 * Constructs a vscode.Webview that is setup to use a HTML template.
 *
 * @param title The title of the webview
 * @param dataPoints The array of DataPoint objects that the webview will use
 *
 * @return A Promise that resolves a HTML template string.
 */
export const ConstructWebview = async (title: string, dataPoints: DataPoint[]) => {
  const panel = vscode.window.createWebviewPanel(
    title.replace(' ', '-'),
    title,
    vscode.ViewColumn.One,
    {
      enableScripts: true
    }
  );

  panel.webview.html = await constructHTML(dataPoints);
  return panel;
};
