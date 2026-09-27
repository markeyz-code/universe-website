import { ref } from 'vue';
import { articlesApi } from '@/api_factory/modules/articles';

export const useGetArticleById = () => {
  const loading = ref(false);
  const article = ref<any>(null);
  const error = ref<string | null>(null);

  const fetchArticle = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await articlesApi.getArticle(id);
      article.value = response.data;
    } catch (err: any) {
      console.error('Error fetching article:', err);
      error.value = err.response?.data?.message || 'Failed to fetch article';
    } finally {
      loading.value = false;
    }
  };

  return { loading, article, error, fetchArticle };
};
