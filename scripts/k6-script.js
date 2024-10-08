import http from 'k6/http';
import { check, sleep } from 'k6';

// Get the region from the environment variable
const REGION = __ENV.REGION || 'us-east-1'; // Default to 'us-east-1' if not provided

let VUS = 10; // Default number of VUs

// Set the number of VUs based on the region 
if (REGION === 'us-east-1') {
    VUS = 70; // Set the number of VUs for us-east-1
} else if (REGION === 'us-east-2') {
    VUS = 30; // Set the number of VUs for us-east-2
} // Add more conditions as needed for other regions

export const options = {
    vus: VUS, // Set the number of VUs
    duration: '1m', // adjust as needed
};

export default function () {
    const response = http.get('http://test.k6.io/');
    check(response, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}
