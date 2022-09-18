import * as request from 'supertest';

export interface Response<T> extends request.Response {
    body: T;
};