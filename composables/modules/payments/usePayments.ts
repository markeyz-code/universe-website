import { ref } from 'vue';
import { useRuntimeConfig } from '#app';
import { useCookie } from '#app';

export const usePayments = () => {
  const config = useRuntimeConfig();
  const loading = ref(false);
  const error = ref<string | null>(null);
  const token = useCookie('auth_token');

  const initializePayment = async (subscriptionId: string, callbackUrl: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${config.public.apiBase}/payments/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
        body: JSON.stringify({ subscriptionId, callbackUrl }),
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to initialize payment');
      }
      return await response.json();
    } catch (err: any) {
      error.value = err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const verifyPayment = async (reference: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${config.public.apiBase}/payments/verify/${reference}`, {
        headers: { 'Authorization': `Bearer ${token.value}` },
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to verify payment');
      }
      return await response.json();
    } catch (err: any) {
      error.value = err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, initializePayment, verifyPayment };
};
