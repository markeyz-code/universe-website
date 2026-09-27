import { GATEWAY_ENDPOINT } from '../axios.config';

export const articlesApi = {
  getArticles() {
    return GATEWAY_ENDPOINT.get('/articles');
  },
  getArticle(id: string) {
    return GATEWAY_ENDPOINT.get(`/articles/${id}`);
  }
};
