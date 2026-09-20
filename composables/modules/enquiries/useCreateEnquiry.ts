import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

export const useCreateEnquiry = () => {
  const config = useRuntimeConfig();
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);

  const createEnquiry = async (data: { name: string; email: string; message: string }) => {
    loading.value = true;
    error.value = null;
    success.value = false;

    try {
      const response = await fetch(`${config.public.apiBase}/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      success.value = true;
      return true;
    } catch (err: any) {
      error.value = err.message || 'An error occurred';
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    success,
    createEnquiry,
  };
};
