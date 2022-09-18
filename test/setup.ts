import * as request from 'supertest';

afterAll(async () => {
    await request('http://localhost:3000').delete('/seed');
});