import * as vscode from 'vscode';

import { DataPoint } from '../Data/DataPoint';
import { GetDataPoints } from '../Data/Data';

export const ShowDataPoints = () => {
  let dataPoints = GetDataPoints();

  if (dataPoints === undefined) {
    return;
  }

  if (dataPoints.length > 0) {
    let AllDataPointsOutputChannel = vscode.window.createOutputChannel('AllDataPoints');

    dataPoints.forEach(point => {
      AllDataPointsOutputChannel.appendLine(DataPoint.getStringRepresentation(point));
    });

    AllDataPointsOutputChannel.show();
  } else {
    vscode.window.showWarningMessage('No Data Points have been added!');
  }
};

export const GenerateDiagram = () => {
  //   let dataPoints = GetDataPoints();

  //   if (dataPoints === undefined || dataPoints.length < 2) {
  //     return;
  //   }

  //! Test Data

  let dataPoints: DataPoint[] = [];

  let datapoint1 = new DataPoint();
  datapoint1.id = 'id1';
  datapoint1.file = 'javascript/testfile.js';
  datapoint1.lineNumber = '45';
  datapoint1.detail = 'This is a test';

  let datapoint2 = new DataPoint();
  datapoint2.id = 'id2';
  datapoint2.file = 'javascript/testfile2.js';
  datapoint2.lineNumber = '98';
  datapoint2.detail = 'This is another test';

  dataPoints.push(datapoint1);
  dataPoints.push(datapoint2);

  /** Creating the Diagram externally.
   *
   * * Local diagram.html and diagram.js files
   *
   * --> In this file, host a local node/http/express server that will
   * --> serve the aforementioned files and will have an endpoint that
   * --> returns the DataPoints when called which can be done in the diagram.js
   * --> file that is being hosted locally.
   *
   *  ! Will need to figure out how to shutdown the node server when the diagram
   *  ! is closed or user no longer needs it.
   *  * ^ Could use smth like web sockets to see when someone connects and close it
   *  * if that connection leaves.
   *
   *
   * If not using server ->
   * need way to write html and js as normal with syntax highlighting and everything
   * and then compile it down into code that a vscode webview can use.
   *
   * --> If going this route, would also be nice to have the html and css (better yet if SASS)
   * --> within the working directory and never have to edit any files in the _out_ directory
   */
};
