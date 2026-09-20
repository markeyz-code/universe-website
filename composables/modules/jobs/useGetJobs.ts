import { ref } from 'vue';
import { jobsApi } from '@/api_factory/modules/jobs';
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useGetJobs = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const jobs = ref<any[]>([]);

  const fetchJobs = async () => {
    loading.value = true;
    try {
      const { data } = await jobsApi.getJobs();
      jobs.value = data;
    } catch (error: any) {
      showToast({ title: 'Error', message: 'Failed to fetch job postings.', type: 'error' });
    } finally {
      loading.value = false;
    }
  };

  return { loading, jobs, fetchJobs };
};
