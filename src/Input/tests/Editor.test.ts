import * as assert from 'assert';

import Editor from '../Editor';

suite('Editor.ts Tests', function() {
  test('Create a new Editor instance and expect it to return the file name and line number it was created with', function() {
    const editor = new Editor(10, 'src/testFile.js');

    assert.strictEqual(editor.GetActiveFileName(), 'src/testFile.js');
    assert.strictEqual(editor.GetActiveLineNumber(), 10);
  });
});
