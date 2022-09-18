import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';

import { createPsychologist } from "../data";
import { Response, UserAuth } from "../interfaces";

export const getTestUser = async ( app: INestApplication ): Promise<UserAuth> => {
    const data: Response<UserAuth> = await request( app.getHttpServer() )
        .post('/auth/login/psychologists')
        .send({
            email: createPsychologist.email,
            password: createPsychologist.password
        });
    
    return data.body;
};
