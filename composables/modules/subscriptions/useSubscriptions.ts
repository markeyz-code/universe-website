import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

export const useSubscriptions = () => {
  const config = useRuntimeConfig();
  const loading = ref(false);
  const error = ref<string | null>(null);
  const subscriptions = ref<any[]>([]);

  const fetchActive = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${config.public.apiBase}/subscriptions`);
      if (!response.ok) throw new Error('Failed to fetch subscriptions');
      subscriptions.value = await response.json();
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, subscriptions, fetchActive };
};
