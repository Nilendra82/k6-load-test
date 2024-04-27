import { check, sleep } from 'k6';
import http from 'k6/http';

export let options = {
  vus: __ENV.US_EAST_1_VUS || __ENV.US_EAST_2_VUS || 1, // default to 1 if the env vars are not set
  duration: '1m',
};

export default function () {
  let res = http.get('http://test.loadimpact.com');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}