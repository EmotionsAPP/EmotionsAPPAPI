import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';

import { Article, ArticleSchema } from './entities/article.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Article.name,
        schema: ArticleSchema
      }
    ]),

    AuthModule
  ],
  controllers: [ ArticlesController ],
  providers: [ ArticlesService ]
})
export class ArticlesModule {}
