import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import * as request from 'supertest';

import { AppModule } from "../src/app.module";

import { getTestUser } from "./helpers";
import { Response, UserAuth } from "./interfaces";
import { createArticle, createdArticle } from './data';
import { Article } from "../src/articles/entities/article.entity";

describe('ArticlesController (e2e)', () => {
  let app: INestApplication;
  let userData: UserAuth;
  let article: Article;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ AppModule ]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    userData = await getTestUser( app );
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/articles (POST)', () => {
    it('should return the created article', async () => {
      const data: Response<Article> = await request( app.getHttpServer() )
        .post('/articles')
        .send({ ...createArticle, psychologist: userData.user._id })
        .set('Authorization', userData.token)
        .expect(201);

      article = data.body;
      
      expect( data.body ).toMatchObject({
        ...createArticle, psychologist: userData.user._id
      });
    });
  });

  describe('/articles (GET)', () => {
    it('should return all articles', async () => {
      const data: Response<Article[]> = await request( app.getHttpServer() )
        .get('/articles')
        .set('Authorization', userData.token)
        .expect(200);

      expect( data.body ).toEqual([ article ]);
    });
  });

  describe('/articles/:id (GET)', () => {
    it('should return an article', async () => {
      const data: Response<Article[]> = await request( app.getHttpServer() )
        .get(`/articles/${article._id}`)
        .set('Authorization', userData.token)
        .expect(200);

      expect( data.body ).toMatchObject({
        ...article,
        psychologist: expect.anything()
      });
    });

    it('should throw not found error if id does not exist', async () => {
      await request( app.getHttpServer() )
        .get(`/articles/6112e99bf9144501281638c9`)
        .set('Authorization', userData.token)
        .expect(404);
    });
  });

  describe('/articles/:id (PATCH)', () => {
    it('should return updated article', async () => {
      const data: Response<Article[]> = await request( app.getHttpServer() )
        .patch(`/articles/${article._id}`)
        .send({ title: 'new title' })
        .set('Authorization', userData.token)
        .expect(200);

      expect( data.body ).toMatchObject({
        ...article,
        title: "new title",
        psychologist: expect.anything()
      });
    });

    it('should throw not found error if id does not exist', async () => {
      await request( app.getHttpServer() )
        .patch(`/articles/6112e99bf9144501281638c9`)
        .send({ title: 'new title' })
        .set('Authorization', userData.token)
        .expect(404);
    });
  });

  describe('/articles/:id (DELETE)', () => {
    it('isActive should be falsy', async () => {
      const data: Response<Article> = await request( app.getHttpServer() )
        .delete(`/articles/${article._id}`)
        .set('Authorization', userData.token)
        .expect(200);
      
      expect( data.body.isActive ).toBeFalsy();
    });
  });
});
