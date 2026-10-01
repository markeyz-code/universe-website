import { ref } from 'vue';
import { mentorsApi } from '@/api_factory/modules/mentors';
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useRequestMentorship = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);

  const statusLoading = ref(false);
  const myStatus = ref('none'); // 'none', 'pending', 'matched'
  const myMentor = ref(null);

  const fetchMyStatus = async (application: string) => {
    statusLoading.value = true;
    try {
      const { data } = await mentorsApi.getMyStatus(application);
      myStatus.value = data.status || 'none';
      myMentor.value = data.mentor || null;
    } catch (error) {
      myStatus.value = 'none';
      myMentor.value = null;
    } finally {
      statusLoading.value = false;
    }
  };

  const requestMentorship = async (payload: { name: string; email: string; areaOfInterest: string; application: string }) => {
    loading.value = true;
    try {
      const { data } = await mentorsApi.requestMentorship(payload);
      showToast({ title: 'Success', message: 'Mentorship request submitted successfully.', type: 'success' });
      myStatus.value = 'pending';
      return data;
    } catch (error: any) {
      showToast({ title: 'Error', message: error?.response?.data?.message || 'Failed to submit mentorship request.', type: 'error' });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, statusLoading, myStatus, myMentor, fetchMyStatus, requestMentorship };
};
