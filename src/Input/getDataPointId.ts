import * as vscode from 'vscode';

const uuidv1 = require('uuid/v1');

export const getDataPointId = () => {
  return new Promise<string>((resolve, reject) => {
    resolve(uuidv1());
  });
};
