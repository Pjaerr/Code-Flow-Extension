const uuidv1 = require('uuid/v1');

/**
 * Generate a unique GUID.
 *
 * @return a Promise that resolves a unique GUID.
 */
export const generateDataPointId = () => {
  return new Promise<string>((resolve, reject) => {
    resolve(uuidv1());
  });
};
