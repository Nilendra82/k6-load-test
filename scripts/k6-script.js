import { check } from 'k6';
import http from 'k6/http';

// Read environment variables for the number of VUs for each region
const usEast1VUs = parseInt(__ENV.US_EAST_1_VUS) || 30;
const usEast2VUs = parseInt(__ENV.US_EAST_2_VUS) || 70;

export const options = {
  // Total duration will be the same for all VUs
  duration: '1m',
};

export default function () {
  // Calculate the number of VUs for each region based on environment variables
  const totalVUs = usEast1VUs + usEast2VUs;
  const ratioUsEast1 = usEast1VUs / totalVUs;

  // Determine the number of VUs for this instance
  const myVUs = Math.floor(totalVUs * ratioUsEast1);

  // Perform checks and HTTP requests
  const res = http.get('http://test.k6.io/');
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
