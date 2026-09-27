import { ref } from 'vue';
import { articlesApi } from '@/api_factory/modules/articles';

export const useGetArticles = () => {
  const loading = ref(false);
  const articles = ref<any[]>([]);

  const fetchArticles = async () => {
    loading.value = true;
    try {
      const response = await articlesApi.getArticles();
      articles.value = response.data || [];
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      loading.value = false;
    }
  };

  return { loading, articles, fetchArticles };
};
