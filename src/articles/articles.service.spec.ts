import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { Model } from 'mongoose';

import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';

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
            findOne: jest.fn()
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
});
