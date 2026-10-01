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
      const res = await jobsApi.getJobs();
      // res.data could be { data, metadata } due to pagination
      jobs.value = res?.data?.data || res?.data || [];
    } catch (error: any) {
      showToast({ title: 'Error', message: 'Failed to fetch job postings.', type: 'error' });
    } finally {
      loading.value = false;
    }
  };

  return { loading, jobs, fetchJobs };
};
