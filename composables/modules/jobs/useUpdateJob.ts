import { ref } from 'vue';
import { useCoreFetch } from '@/composables/core/useCoreFetch';

export const useUpdateJob = () => {
  const loading = ref(false);
  const { $api } = useCoreFetch();

  const updateJob = async (id: string, payload: any) => {
    loading.value = true;
    try {
      await $api.patch(`/jobs/${id}`, payload);
      loading.value = false;
      return true;
    } catch (error) {
      console.error('Failed to update job', error);
      loading.value = false;
      return false;
    }
  };

  return {
    loading,
    updateJob,
  };
};
