import { ref } from 'vue';
import { useRuntimeConfig } from '#app';
import { useAuth } from '@/composables/core/useAuth';

export const useDashboardStats = () => {
  const config = useRuntimeConfig();
  const { getToken } = useAuth();
  
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  const stats = ref({
    documentsUploaded: 0,
    mentorshipSessions: 0,
    jobsApplied: 0
  });

  const fetchStats = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${config.public.apiBase}/users/me/dashboard-stats`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      
      const data = await response.json();
      stats.value = data;
    } catch (err: any) {
      error.value = err.message || 'Error fetching stats';
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    stats,
    fetchStats
  };
};
