import http from 'k6/http';

const email = "test.psychologist@gmail.com";
const password = "Test1239S";

export let options = {
    insecureSkipTLVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '5m', target: 100 },
        { duration: '10m', target: 100 },
        { duration: '5m', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<2000']
    },
};

export default () => {
    let response = http.post('http://localhost:3000/auth/login/psychologists', { email, password });
};