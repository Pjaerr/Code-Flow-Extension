import { TextEditor } from 'vscode';

class Editor {
  private activeLine: number;
  private activeFile: string;

  constructor(activeLine: number, activeFile: string) {
    this.activeLine = activeLine;
    this.activeFile = activeFile;
  }

  static fromTextEditor(textEditor: TextEditor | undefined) {
    if (textEditor && textEditor.document.fileName !== 'tasks') {
      return new this(textEditor.selection.active.line, textEditor.document.fileName);
    }

    throw new Error('You must have a file open and a line selected for this extension to work!');
  }

  GetActiveLineNumber = (): number => {
    return this.activeLine;
  };

  GetActiveFileName = (): string => {
    return this.activeFile;
  };
}

export default Editor;
