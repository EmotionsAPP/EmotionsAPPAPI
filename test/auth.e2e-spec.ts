import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";

import * as request from 'supertest';

import { AppModule } from "../src/app.module";

import { createPsychologist } from './data';
import { mockUser } from "./helpers";

const duplicatedPsychologists = [
  mockUser({ taxId: createPsychologist.taxId, email: "test2.psychologist2@gmail.com", 
    password: createPsychologist.password, psychologist: { codopsi: "1231231" } as any
  }),
  mockUser({ email: createPsychologist.email, password: createPsychologist.password, 
    psychologist: { codopsi: "1231231" } as any
  }),
  mockUser({ email: "test2.psychologist2@gmail.com", password: createPsychologist.password, 
    psychologist: { codopsi: "1234567" } as any
  })
];

const expectedPsychologist = {
  user: {
    _id: expect.any(String),
    isActive: true,
    ...createPsychologist,
    password: expect.any(String)
  }, 
  token: expect.any(String)
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [ AppModule ]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await request( app.getHttpServer() ).delete('/seed');
    await app.close();
  });

  describe('/auth/psychologists (POST)', () => {
    it('should return the user with id', async () => {
      const data = await request( app.getHttpServer() )
        .post('/auth/psychologists')
        .send( createPsychologist )
        .expect( 201 );

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
});