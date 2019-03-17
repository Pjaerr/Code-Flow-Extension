const uuidv1 = require('uuid/v1');

export const generateDataPointId = () => {
  return new Promise<string>((resolve, reject) => {
    resolve(uuidv1());
  });
};
