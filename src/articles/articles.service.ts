import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateArticleDto, FindArticlesDto, UpdateArticleDto } from './dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {

  constructor(
    @InjectModel( Article.name )
    private readonly articleModel: Model<Article>
  ) {}

  async create( createArticleDto: CreateArticleDto ) {
    return await this.articleModel.create( createArticleDto );
  }

  async findAll( findArticlesDto: FindArticlesDto ) {
    const { psychologistId } = findArticlesDto;

    let query: any = { isActive: { $ne: false } };

    if ( psychologistId ) query.psychologist = { $eq: psychologistId };

    return await this.articleModel.find( query );
  }

  async findOne( id: string ) {
    const article = await this.articleModel.findById( id );

    if ( !article )
      throw new NotFoundException(`Article with id ${id} not found`);

    await article.populate('psychologist');

    return article;
  }

  async update( id: string, updateArticleDto: UpdateArticleDto ) {
    const article = await this.findOne( id );

    await article.updateOne( updateArticleDto );

    if ( updateArticleDto.psychologist )
      return await this.findOne( id );

    return { ...article.toObject(), ...updateArticleDto };
  }
}
