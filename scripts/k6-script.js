import { check } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 100,
    duration: '10s',
  };

export default function () {
  const res = http.get('http://test.k6.io/');
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}