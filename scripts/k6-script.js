import { check } from 'k6';
import http from 'k6/http';

const usEast1VUs = __ENV.US_EAST_1_VUS || 30;
const usEast2VUs = __ENV.US_EAST_2_VUS || 70;

export const options = {
  vus: usEast1VUs + usEast2VUs, // Total VUs
  duration: '1m',
};

export default function () {
  if (__VU <= usEast1VUs) {
    // VUs for us-east-1
    const res = http.get('http://test.k6.io/');
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
  } else {
    // VUs for us-east-2
    const res = http.get('http://test.k6.io/');
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
  }
}
