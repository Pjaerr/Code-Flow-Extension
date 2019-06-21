import { GetDataPointsFromDataStorage } from '../Data/DataStorage';

const getCurrentOrderId = () => {
  const dataPoints = GetDataPointsFromDataStorage();

  if (dataPoints.length > 0) {
    return dataPoints.length;
  }

  return 0;
};

export default getCurrentOrderId;
