import {
  IArticle,
  IArticleList,
  IArticleRequest,
} from '../interfaces/article.interface';
import client from '../utils/axios';

const ArticleAPI = {
  getAll: async (): Promise<IArticleList> => {
    const response = await client.get(`/articles`);
    return response.data;
  },
  getById: async (id: number): Promise<IArticle> => {
    const response = await client.get(`/article/${id}`);
    return response.data;
  },
  create: async (article: IArticleRequest): Promise<IArticle> => {
    const response = await client.post(`/article`, article);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await client.delete(`/article/${id}`);
  },
  update: async (id: number, article: IArticleRequest): Promise<IArticle> => {
    const response = await client.put(`/article/${id}`, article);
    return response.data;
  },
};

export default ArticleAPI;
