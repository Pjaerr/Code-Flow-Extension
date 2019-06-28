import * as vscode from 'vscode';
import { GetDataPointsFromDataStorage } from '../Data/DataStorage';
import DataPoint from '../Data/DataPoint';

const GenerateDiagram = () => {
  let dataPoints = GetDataPointsFromDataStorage();

  // TO TEST DIAGRAM
  //   const dataPoint1 = new DataPoint(
  //     13,
  //     'Test DataPoint 1',
  //     'Some detail about this test data point.',
  //     'c:/projects/findr/src/frontend/file.js',
  //     0
  //   );
  //   const dataPoint2 = new DataPoint(
  //     19,
  //     'Test DataPoint 2',
  //     'Some detail about this test data point.',
  //     'c:/projects/findr/src/frontend/file.js',
  //     1
  //   );
  //   const dataPoint3 = new DataPoint(
  //     168,
  //     'Test DataPoint 3',
  //     'Some detail about this test data point.',
  //     'c:/projects/findr/src/frontend/file.js',
  //     2
  //   );
  //   const dataPoint4 = new DataPoint(
  //     28,
  //     'Test DataPoint 4',
  //     'Some detail about this test data point.',
  //     'c:/projects/findr/src/frontend/file.js',
  //     3
  //   );

  //   let dataPoints = [dataPoint1, dataPoint2, dataPoint3, dataPoint4];

  dataPoints = dataPoints.sort((pointA, pointB) => pointA.orderId - pointB.orderId);

  const panel = vscode.window.createWebviewPanel(
    'Code-Flow-Diagram',
    'Code Flow - Diagram',
    vscode.ViewColumn.One,
    {
      enableScripts: true
    }
  );

  let dataPointsString = '';

  dataPoints.forEach(point => {
    dataPointsString += `
        <div class="data-point">
            <span class="data-point-top-section">
                <h2 class="data-point-name">${point.name}</h2>
                <a class="data-point-file-link" href="${point.file}">
                    <h4 class="data-point-file">${vscode.workspace.asRelativePath(
                      point.file,
                      true
                    )}:${point.lineNumber}</h4>
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
            body {
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
            }

            .data-point {
                width: 600px;
                height: auto;
                border: 1px solid white;
                padding: 10px;
                margin: 30px;
                display: flex;
                flex-direction: column;
                color: #333;
                background: #f5f5f5;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px;
            }

            .data-point-top-section {
                width: 100%;
                padding: initial;
                border-bottom: 1px solid #333;
            }
          </style>
        </head>
        <body>
            ${dataPointsString}

            <script>
            //Grab all links on the page and post them back to be opened in editor when clicked
            const vscode = acquireVsCodeApi();

            document.addEventListener('click', event => {
                let node = event && event.target;
                while (node) {
                    if (node.tagName && node.tagName === 'A' && node.href) {
                        vscode.postMessage(node.href);
                        event.preventDefault();
                        return;
                    }
                    node = node.parentNode;
                }
            }, true);
            </script>
        </body>
      </html>
  `;

  panel.webview.onDidReceiveMessage((message: string) => {
    if (message.startsWith('file://')) {
      const uri = vscode.Uri.parse(message);
      vscode.workspace.openTextDocument(uri).then(doc => vscode.window.showTextDocument(doc));
    }
  });
};

export default GenerateDiagram;
