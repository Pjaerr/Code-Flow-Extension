import * as vscode from 'vscode';
import { GetDataPointsFromDataStorage } from '../Data/DataStorage';

//Import WebView Files
import css from './WebViewFiles/css';
import javascript from './WebViewFiles/javascript';

const GenerateDiagram = () => {
  let dataPoints = GetDataPointsFromDataStorage();

  if (dataPoints.length > 1) {
    //Sort dataPoints by their orderId
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
                <a data-line-number="${point.lineNumber}" class="data-point-file-link" href="${
        point.file
      }">
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
          <svg class="data-point-svg-arrow" width="600" height="100">
          <defs>  
            <marker id="arrow" markerWidth="10" markerHeight="6" refX="1" refY="3" orient="auto" markerUnits="strokeWidth">
              <path fill="#fdcb6e" d="M0,0 L0,6 L9,3 z"></path>
            </marker>
          </defs>
          <line stroke="#fdcb6e" x1="50%" y1="0" x2="50%" y2="80%" stroke-width="2" marker-end="url(#arrow)"></line>
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
          <title>${panel.title}</title>
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

    //Listen for messages being posted from our webview.
    panel.webview.onDidReceiveMessage(handleWebViewMessage);
  } else {
    vscode.window.showWarningMessage(
      'You must have added atleast 2 Data Points to generate a diagram!'
    );
  }
};

const handleWebViewMessage = async (message: string) => {
  /**
   * When we click on a link within the WebView, we then post a message as stringified JSON
   * which is an object with a filePath and lineNumber.
   */
  const data: { filePath: string; lineNumber: string } = JSON.parse(message);

  if (data) {
    const lineNumber = parseInt(data.lineNumber);

    const uri = vscode.Uri.parse(data.filePath);

    const doc = await vscode.workspace.openTextDocument(uri);

    await vscode.window.showTextDocument(doc);

    const editor = vscode.window.activeTextEditor;

    //Open the text editor to the specified line number
    if (editor) {
      let range = editor.document.lineAt(lineNumber - 1).range;
      editor.selection = new vscode.Selection(range.start, range.end);
      editor.revealRange(range);
    }
  }
};

export default GenerateDiagram;
