import { ref } from 'vue';
import { jobsApi } from '@/api_factory/modules/jobs';

export const useUpdateJob = () => {
  const loading = ref(false);

  const updateJob = async (id: string, payload: any) => {
    loading.value = true;
    try {
      await jobsApi.updateJob(id, payload);
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
