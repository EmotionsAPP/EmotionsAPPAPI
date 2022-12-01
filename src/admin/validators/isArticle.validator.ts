import { ValidationError } from 'adminjs';
import { isEmpty, isMongoId, length } from "class-validator";

interface ArticlePayload {
  title: string;
  body: string;
  psychologist: string;
}

export const isArticle = (payload: ArticlePayload) => {
  const { title, body, psychologist } = payload;

  const errors: any = {};

  if (title && !length(title.trim(), 1, 50)) {
    errors.title = {
      message: 'Field must be longer than or equal to 1 and shorter than or equal to 50 characters'
    }
  }

  if (body && isEmpty(body.trim())) {
    errors.body = {
      message: 'Field should not be empty'
    }
  }

  try {
    if (!isMongoId(psychologist)) {
      errors.psychologist = {
        message: 'Field must be a mongodb id'
      }
    }
  } catch (error) {
    errors.psychologist = {
      message: 'Field must be a mongodb id'
    }
  }

  if (Object.keys(errors).length) throw new ValidationError(errors);
}

export const validateArticle = (request, context) => {

  const { payload = {}, method } = request;

  if ( method !== 'post' ) return request;

  const article: ArticlePayload = {
    title: payload.title,
    body: payload.body,
    psychologist: payload.psychologist
  };

  isArticle( article );

  return request;
}
