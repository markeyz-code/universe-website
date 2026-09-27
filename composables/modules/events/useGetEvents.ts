import { ref } from 'vue';
import { eventsApi } from '@/api_factory/modules/events';

export const useGetEvents = () => {
  const loading = ref(false);
  const events = ref<any[]>([]);

  const fetchEvents = async () => {
    loading.value = true;
    try {
      const response = await eventsApi.getEvents();
      events.value = response.data || [];
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      loading.value = false;
    }
  };

  return { loading, events, fetchEvents };
};
