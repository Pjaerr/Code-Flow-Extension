import * as assert from 'assert';
import * as vscode from 'vscode';

import { InitialiseDataStorage, PushDataPointToDataStorage } from '../DataStorage';
import DataPoint from '../DataPoint';

/**
 * This is a mock memento object that just stores data internally. We can use this
 * to mock ExtensionContext.globalState during testing.
 */
class MockMementoObject implements vscode.Memento {
  internalStorage: Map<string, any> = new Map();

  get<T>(key: string): T {
    return this.internalStorage.get(key);
  }

  update(key: string, value: any) {
    return new Promise<void>((resolve, reject) => {
      this.internalStorage.set(key, value);
    });
  }
}

suite('DataStorage.ts Tests', function() {
  test('Call InitialiseDataStorage() with a mock Memento object, expect an array called DataPoints to be added to the mock Memento object', function() {
    const mockMementoObject = new MockMementoObject();

    InitialiseDataStorage(mockMementoObject);

    const dataPointsArray: Array<any> = mockMementoObject.get('DataPoints');

    assert.strictEqual(typeof dataPointsArray, typeof []);
    assert.strictEqual(dataPointsArray.length, 0);
  });

  test('Call PushDataPointToDataStorage() with a mock DataPoint, expect DataPoints array on a mock Memento object to have an extra element where element.name is equal to mock DataPoint.name', function() {
    const mockMementoObject = new MockMementoObject();
    InitialiseDataStorage(mockMementoObject);

    const mockDataPoint = new DataPoint(
      '10',
      'Mock Data Point',
      'This is a fake data point',
      '/src/fakeFile.js',
      0
    );

    PushDataPointToDataStorage(mockDataPoint);

    const dataPointsArray: Array<any> = mockMementoObject.get('DataPoints');

    assert.strictEqual(dataPointsArray.length, 1);

    assert.strictEqual(dataPointsArray[0].name, 'Mock Data Point');
  });
});
