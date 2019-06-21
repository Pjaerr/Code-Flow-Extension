import * as assert from 'assert';

import { Memento } from 'vscode';

import { InitialiseDataStorage, PushDataPointToDataStorage } from '../../Data/DataStorage';
import DataPoint from '../../Data/DataPoint';
import getCurrentOrderId from '../getCurrentOrderId';

/**
 * This is a mock memento object that just stores data internally. We can use this
 * to mock ExtensionContext.globalState during testing.
 */
class MockMementoObject implements Memento {
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

suite('getCurrentOrderId.ts Tests', function() {
  test('Call getCurrentOrderId before adding any data points, expect 0 to be returned', function() {
    const mockMementoObject = new MockMementoObject();
    InitialiseDataStorage(mockMementoObject);

    const currentOrderId = getCurrentOrderId();

    assert.strictEqual(currentOrderId, 0);
  });

  test('Add a data point to Data Storage and then call getCurrentOrderId(), expect 1 to be returned', function() {
    const mockMementoObject = new MockMementoObject();
    InitialiseDataStorage(mockMementoObject);

    PushDataPointToDataStorage(new DataPoint(10, 'Test', 'Test Detail', 'src/testFile.ts', 0));

    const currentOrderId = getCurrentOrderId();

    assert.strictEqual(currentOrderId, 1);
  });
});
