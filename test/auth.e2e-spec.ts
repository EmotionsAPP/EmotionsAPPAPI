import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";

import * as request from 'supertest';

import { AppModule } from "../src/app.module";

import {
  createPsychologist,
  duplicatedPsychologists,
  expectedPsychologist,
  createPatient,
  expectedPatient,
  duplicatedPatient
} from './data';
import { Response, UserAuth } from "./interfaces";

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userToken: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [ AppModule ]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/psychologists (POST)', () => {
    it('should return the user with id', async () => {
      const data: Response<UserAuth> = await request( app.getHttpServer() )
        .post('/auth/psychologists')
        .send( createPsychologist )
        .expect( 201 );

      userToken = data.body.token;

      expect( data.body ).toMatchObject( expectedPsychologist );
    });

    it('should throw conflict error if user taxId already exists', async () => {
      await request( app.getHttpServer() )
        .post('/auth/psychologists')
        .send( duplicatedPsychologists[0] )
        .expect( 409 );
    });

    it('should throw conflict error if user email already exists', async () => {
      await request( app.getHttpServer() )
        .post('/auth/psychologists')
        .send( duplicatedPsychologists[1] )
        .expect( 409 );
    });

    it('should throw conflict error if user codopsi already exists', async () => {
      await request( app.getHttpServer() )
        .post('/auth/psychologists')
        .send( duplicatedPsychologists[2] )
        .expect( 409 );
    });
  });

  describe('/auth/patients (POST)', () => {
    it('should return the user with id', async () => {
      const data = await request( app.getHttpServer() )
        .post('/auth/psychologists')
        .send( createPatient )
        .expect( 201 );

      expect( data.body ).toMatchObject( expectedPatient );
    });

    it('should throw conflict error if user taxId already exists', async () => {
      await request( app.getHttpServer() )
        .post('/auth/psychologists')
        .send( duplicatedPatient[0] )
        .expect( 409 );
    });

    it('should throw conflict error if user email already exists', async () => {
      await request( app.getHttpServer() )
        .post('/auth/psychologists')
        .send( duplicatedPatient[1] )
        .expect( 409 );
    });

    it('should throw conflict error if user codopsi already exists', async () => {
      await request( app.getHttpServer() )
        .post('/auth/psychologists')
        .send( duplicatedPatient[2] )
        .expect( 409 );
    });
  });

  describe('/auth/login/psychologists (POST)', () => {
    it('should return the user with the token', async () => {
      const data: Response<UserAuth> = await request( app.getHttpServer() )
        .post('/auth/login/psychologists')
        .send({ 
          email: createPsychologist.email,
          password: createPsychologist.password
        }).expect(201);
      
      expect( data.body ).toMatchObject( expectedPsychologist );
    });

    it('should throw unauthorized error if user is not found', async () => {
      await request( app.getHttpServer() )
        .post('/auth/login/psychologists')
        .send({
          email: "not_an_email@gmail.com",
          password: createPsychologist.password
        }).expect(401);
    });

    it('should throw unauthorized error if password does not match', async () => {
      await request( app.getHttpServer() )
        .post('/auth/login/psychologists')
        .send({
          email: createPsychologist.email,
          password: "fas"
        }).expect(401);
    });
  });

  describe('/auth/login/patients (POST)', () => {
    it('should return the user with the token', async () => {
      const data: Response<UserAuth> = await request( app.getHttpServer() )
        .post('/auth/login/patients')
        .send({ 
          email: createPatient.email,
          password: createPatient.password
        }).expect(201);
      
      expect( data.body ).toMatchObject( expectedPsychologist );
    });

    it('should throw unauthorized error if user is not found', async () => {
      await request( app.getHttpServer() )
        .post('/auth/login/patients')
        .send({
          email: "not_an_email@gmail.com",
          password: createPatient.password
        }).expect(401);
    });

    it('should throw unauthorized error if password does not match', async () => {
      await request( app.getHttpServer() )
        .post('/auth/login/patients')
        .send({
          email: createPatient.email,
          password: "fas"
        }).expect(401);
    });
  });

  describe('/auth/check-status (GET)', () => {
    it('should return the user with a new token', async () => {
      const data: Response<UserAuth> = await request( app.getHttpServer() )
        .get('/auth/check-status')
        .set('Authorization', userToken)
        .expect(200);
      
      expect( data.body ).toMatchObject( expectedPsychologist );
      expect( userToken !== data.body.token ).toBeTruthy();
    });
  });
});