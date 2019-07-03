import * as vscode from 'vscode';
import { GetDataPointsFromDataStorage } from '../Data/DataStorage';

//Import WebView Files
import css from './WebViewFiles/css';
import javascript from './WebViewFiles/javascript';

const GenerateDiagram = () => {
  let dataPoints = GetDataPointsFromDataStorage();

  if (dataPoints.length > 1) {
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

      //If this is not the last Data Point, draw an arrow to the next point
      if (point.orderId < dataPoints.length - 1) {
        dataPointsHTML += `
          <svg width="600" height="100">
            <line x1="50%" y1="0" x2="50%" y2="100%" style="stroke:rgb(255,0,0);stroke-width:2" />
          </svg> 
        `;
      }
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
  } else {
    vscode.window.showWarningMessage(
      'You must have added atleast 2 Data Points to generate a diagram!'
    );
  }
};

export default GenerateDiagram;
