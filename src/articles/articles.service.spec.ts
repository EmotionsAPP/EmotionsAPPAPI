import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { Model } from 'mongoose';

import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';

import { createArticle, createdArticle, updateArticle, updatedArticle } from "../../test/data";

describe('ArticlesService', () => {
  let service: ArticlesService;
  let model: Model<Article>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getModelToken( Article.name ),
          useValue: {
            create: jest.fn().mockReturnValue( createdArticle ),
            find: jest.fn().mockReturnValue([ createdArticle ]),
            findById: jest.fn()
              .mockReturnValueOnce( createdArticle )
              .mockReturnValueOnce( undefined ),
          }
        }
      ],
    }).compile();

    service = module.get<ArticlesService>( ArticlesService );
    model = module.get<Model<Article>>( getModelToken( Article.name ) );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return created article', async () => {
      expect( await service.create( createArticle ) ).toEqual( createdArticle );
    });
  });

  describe('findAll', () => {
    it('should return array of articles', async () => {
      expect( await service.findAll() ).toEqual([ createdArticle ]);
    });
  })

  describe('findOne', () => {
    it('should return article if id exists', async () => {
      expect( await service.findOne( "1" ) ).toEqual( createdArticle );
    });

    it('should throw not found error if id does not exist', async () => {
      try {
        await service.findOne("-1");
      } catch (error) {
        expect( error ).toBeInstanceOf( NotFoundException );
      }
    });
  });

  describe('update', () => {
    it('should return updated article', async () => {
      jest.spyOn(service, 'findOne').mockImplementationOnce((id: string) => createdArticle as any);

      expect( await service.update("1", updateArticle) ).toEqual( updatedArticle );
    });

    it('should find user if update includes psychologist', async () => {
      jest.spyOn(service, 'findOne')
        .mockImplementationOnce((id: string) => createdArticle as any)
        .mockImplementationOnce((id: string) => updatedArticle as any);

      expect( await service.update("1", { psychologist: "2" }) ).toEqual( updatedArticle );
    });

    it('should throw not found error if id does not exist', async () => {
      jest.spyOn(service, 'findOne').mockImplementationOnce((id: string) => {
        throw new NotFoundException();
      });

      try {
        await service.update("-1", updateArticle);
      } catch (error) {
        expect( error ).toBeInstanceOf( NotFoundException );
      }
    });
  });
});
