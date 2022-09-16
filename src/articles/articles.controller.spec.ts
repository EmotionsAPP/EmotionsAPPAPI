import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto } from './dto';
import { createArticle, createdArticle, updateArticle, updatedArticle } from "../../test/data";
import { NotFoundException } from '@nestjs/common';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            create: jest.fn()
              .mockImplementation((createArticle: CreateArticleDto) => createdArticle),
            findAll: jest.fn()
              .mockImplementation(() => [createdArticle]),
            findOne: jest.fn()
              .mockImplementationOnce((id: string) => createdArticle)
              .mockImplementationOnce((id: string) => { throw new NotFoundException() }),
            update: jest.fn()
          }
        }
      ],
    }).compile();

    controller = module.get<ArticlesController>( ArticlesController );
    service = module.get<ArticlesService>( ArticlesService );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return created article', () => {
      expect( controller.create( createArticle ) ).toEqual( createdArticle );
    });
  });

  describe('findAll', () => {
    it('should return array of articles', () => {
      expect( controller.findAll() ).toEqual([ createdArticle ]);
    });
  })

  describe('findOne', () => {
    it('should return article if id exists', () => {
      expect( controller.findOne( "1" ) ).toEqual( createdArticle );
    });

    it('should throw not found error if id does not exist', () => {
      try {
        service.findOne("-1");
      } catch (error) {
        expect( controller ).toBeInstanceOf( NotFoundException );
      }
    });
  });

  describe('update', () => {
    it('should return updated article', () => {
      jest.spyOn(service, "update").mockImplementationOnce(
        (id: string, update: UpdateArticleDto) => updatedArticle
      );

      expect( controller.update("1", updateArticle) ).toEqual( updatedArticle );
    });

    it('should find user if update includes psychologist', () => {
      jest.spyOn(service, "update").mockImplementationOnce((id: string, update: UpdateArticleDto) => ({ 
        ...createdArticle, psychologist: "2" 
      }));

      expect( controller.update("1", { psychologist: "2" }) ).toEqual({ ...createdArticle, psychologist: "2" });
    });

    it('should throw not found error if id does not exist', () => {
      jest.spyOn(service, "update").mockImplementationOnce(
        (id: string, update: UpdateArticleDto) => { throw new NotFoundException() }
      );

      try {
        controller.update("-1", updateArticle);
      } catch (error) {
        expect( error ).toBeInstanceOf( NotFoundException );
      }
    });
  });

  describe('remove', () => {
    it('isActive should be false', () => {
      jest.spyOn(service, "update").mockImplementationOnce((id: string, update: UpdateArticleDto) => ({
        ...createdArticle, isActive: false
      }));

      expect( controller.remove("1") ).toEqual({ ...createdArticle, isActive: false });
    });
  });
});
