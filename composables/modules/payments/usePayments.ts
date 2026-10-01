import { ref } from 'vue';
import { paymentsApi } from '@/api_factory/modules/payments';
import { useCustomToast } from '@/composables/core/useCustomToast';

export const usePayments = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const error = ref<string | null>(null);

  const initializePayment = async (subscriptionId: string, callbackUrl: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await paymentsApi.initialize({ subscriptionId, callbackUrl });
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || 'Failed to initialize payment';
      showToast({
        title: 'Payment Error',
        message: error.value!,
        toastType: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  const verifyPayment = async (reference: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await paymentsApi.verify(reference);
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || 'Failed to verify payment';
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, initializePayment, verifyPayment };
};
