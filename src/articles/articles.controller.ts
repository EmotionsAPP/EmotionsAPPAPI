import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, FindArticlesDto, UpdateArticleDto } from './dto';
import { Article } from './entities/article.entity';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll(@Query() findArticlesDto: FindArticlesDto): Promise<Article[]> {
    return this.articlesService.findAll( findArticlesDto );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findOne( id );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update( id, updateArticleDto );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.update( id, { isActive: false } );
  }
}
