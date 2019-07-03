import * as vscode from 'vscode';
import { GetDataPointsFromDataStorage } from '../Data/DataStorage';

//Import WebView Files
import css from './WebViewFiles/css';
import javascript from './WebViewFiles/javascript';

const GenerateDiagram = () => {
  let dataPoints = GetDataPointsFromDataStorage();

  //Order dataPoints by their orderId
  dataPoints = dataPoints.sort((pointA, pointB) => pointA.orderId - pointB.orderId);

  const panel = vscode.window.createWebviewPanel(
    'Code-Flow-Diagram',
    'Code Flow - Diagram',
    vscode.ViewColumn.One,
    {
      enableScripts: true
    }
  );

  let dataPointsHTML = '';

  dataPoints.forEach(point => {
    dataPointsHTML += `
        <div class="data-point">
            <span class="data-point-top-section">
                <h2 class="data-point-name">${point.name}</h2>
                <a class="data-point-file-link" href="${point.file}">
                    <h4 class="data-point-file">
                    ${vscode.workspace.asRelativePath(point.file, true)}:${point.lineNumber}
                    </h4>
                </a>
            </span>
            <span class="data-point-bottom-section">
                <p class="data-point-detail">${point.detail}</p>
            </span>
        </div>
      `;
  });

  panel.webview.html = `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title>CodeFlow Diagram</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            ${css}
          </style>
        </head>
        <body>
            ${dataPointsHTML}

            <script>
              ${javascript}
            </script>
        </body>
      </html>
  `;

  /*
    Listen for messages being posted from our webview. If the message is a string that starts
    with file:// this means it is a local file link that we can open within the editor.
  */
  panel.webview.onDidReceiveMessage((message: string) => {
    if (message.startsWith('file://')) {
      const uri = vscode.Uri.parse(message);
      vscode.workspace.openTextDocument(uri).then(doc => vscode.window.showTextDocument(doc));
    }
  });
};

export default GenerateDiagram;
