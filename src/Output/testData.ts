import { DataPoint } from '../Data/DataPoint';

let datapoint1 = new DataPoint();
datapoint1.id = 'id1';
datapoint1.file = 'javascript/testfile.js';
datapoint1.lineNumber = '45';
datapoint1.detail = 'This is a test';
datapoint1.linkedDataPoints = [];

let datapoint2 = new DataPoint();
datapoint2.id = 'id2';
datapoint2.file = 'javascript/testfile2.js';
datapoint2.lineNumber = '98';
datapoint2.detail = 'This is another test';
datapoint2.linkedDataPoints = [datapoint1.id];

export default [datapoint1, datapoint2];
