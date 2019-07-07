import DataPoint from '../Data/DataPoint';

export default [
  new DataPoint(
    10,
    'Call to the tracking API',
    'Makes a call to the tracking API on the backend that kick starts the entire package generation process. This function knows nothing about the backend code in use.',
    'PackageDeliveryService/src/components/Tracker.js',
    0
  ),
  new DataPoint(
    168,
    'The Tracking API',
    'Receives a HTTP GET request from a frontend with a specificed domain in the environment variables and makes call to the TrackingService, returning the result of that call to the HTTP GET request.',
    'PackageDeliveryService/backend/src/controllers/TrackerController.cs',
    1
  ),
  new DataPoint(
    4,
    'The Tracking Service',
    'Attaches to the mongoDB database and pulls out the latest values from the Tracking column in the LatestPackages table and returns this to the caller.',
    'PackageDeliveryService/backend/src/services/TrackerService.js',
    2
  )
];
