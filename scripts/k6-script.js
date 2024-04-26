import { check } from 'k6';
import http from 'k6/http';

// Read environment variables for the number of VUs for each region
const usEast1VUs = parseInt(__ENV.US_EAST_1_VUS) || 30;
const usEast2VUs = parseInt(__ENV.US_EAST_2_VUS) || 70;

export const options = {
  vus: usEast1VUs + usEast2VUs, // Total VUs
  duration: '1m',
};

export default function () {
  if (__VU < usEast1VUs) { // Check if current VU is less than usEast1VUs
    console.log('us-east-1 VU: ', usEast1VUs);
    // VUs for us-east-1
    const res = http.get('http://test.k6.io/');
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
  } else {
    console.log('us-east-2 VU: ', usEast2VUs);
    // VUs for us-east-2
    const res = http.get('http://test.k6.io/');
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
  }
}