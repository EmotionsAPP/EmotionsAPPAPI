import http from 'k6/http';
import { createPsychologist } from './data';

const { email, password } = createPsychologist;

export let options = {
    insecureSkipTLVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '5m', target: 100 },
        { duration: '2m', target: 100 },
        { duration: '5m', target: 200 },
        { duration: '2m', target: 200 },
        { duration: '5m', target: 300 },
        { duration: '2m', target: 300 },
        { duration: '5m', target: 400 },
        { duration: '2m', target: 400 },
        { duration: '5m', target: 0 }
    ],
};

const API_BASE_URL = 'http://localhost:3000';

export default () => {
    
    http.batch([
        ['POST', `${API_BASE_URL}/auth/login/psychologists`, { email, password }],
        ['GET', `${API_BASE_URL}/articles`],
        ['GET', `${API_BASE_URL}/appointments?userId=632fe032a53dee15dc2624da&date=2022-09-13`]
    ]);

};