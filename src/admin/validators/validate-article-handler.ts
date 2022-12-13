import { ActionContext } from 'adminjs';
import { CreateArticleDto, UpdateArticleDto } from '../../articles/dto';
import { validateObject } from './validate-object';

export const validateArticleHandler = async (request, context: ActionContext) => {

  const { payload = {}, method } = request;

  if ( method !== 'post' ) return request;

  if (context.action.name === "new") {
    const createArticleDto = new CreateArticleDto();
    createArticleDto.title = payload.title;
    createArticleDto.body = payload.body;
    createArticleDto.psychologist = payload.psychologist;
    await validateObject( createArticleDto );
  }
  else {
    const updateArticleDto = new UpdateArticleDto();
    updateArticleDto.title = payload.title;
    updateArticleDto.body = payload.body;
    updateArticleDto.psychologist = payload.psychologist;
    await validateObject( updateArticleDto );
  }

  return request;
}
