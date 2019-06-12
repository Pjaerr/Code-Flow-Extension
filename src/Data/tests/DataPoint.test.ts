import * as assert from 'assert';

import DataPoint from '../DataPoint';

suite('DataPoint.ts Tests', function() {
  test('Create a DataPoint and expect all of its properties to be initialised correctly.', function() {
    const dataPoint = new DataPoint(
      '10',
      'Mock Data Point',
      'This is a fake data point',
      '/src/test.js',
      0
    );

    assert.strictEqual(dataPoint.lineNumber, '10');
    assert.strictEqual(dataPoint.name, 'Mock Data Point');
    assert.strictEqual(dataPoint.detail, 'This is a fake data point');
    assert.strictEqual(dataPoint.file, '/src/test.js');
    assert.strictEqual(dataPoint.orderId, 0);
  });
});
