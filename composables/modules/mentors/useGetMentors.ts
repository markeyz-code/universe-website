import { ref } from 'vue';
import { mentorsApi } from '@/api_factory/modules/mentors';
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useGetMentors = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const mentors = ref<any[]>([]);

  const fetchMentors = async () => {
    loading.value = true;
    try {
      const { data } = await mentorsApi.getMentors();
      mentors.value = data;
    } catch (error: any) {
      showToast({ title: 'Error', message: 'Failed to fetch mentors.', type: 'error' });
    } finally {
      loading.value = false;
    }
  };

  return { loading, mentors, fetchMentors };
};
