import { ref } from 'vue';
import { vaultApi } from '@/api_factory/modules/vault';
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useAccessResource = () => {
  const { showToast } = useCustomToast();
  const loading = ref<string | null>(null); // tracks which resource ID is loading

  /**
   * Fetches a time-limited signed URL from the backend and opens it.
   * Opens the file in a new tab for download/viewing.
   */
    const accessResource = async (resourceId: string) => {
      loading.value = resourceId;
      try {
        const { data } = await vaultApi.getSignedUrl(resourceId);
        return { url: data?.signedUrl, needsPayment: false };
      } catch (err: any) {
        if (err.response?.status === 403) {
          return { url: null, needsPayment: true };
        }
        const message = err.response?.data?.message || 'Could not open resource. Please try again.';
        showToast({ title: 'Access Failed', message, type: 'error' });
        return { url: null, needsPayment: false };
      } finally {
        loading.value = null;
      }
    };

    const buyResource = async (resourceId: string, reference: string) => {
      loading.value = resourceId;
      try {
        const { data } = await vaultApi.buyPremiumResource(resourceId, reference);
        showToast({ title: 'Success', message: 'Premium resource purchased!', type: 'success' });
        return data?.signedUrl;
      } catch (err: any) {
        const message = err.response?.data?.message || 'Payment verification failed.';
        showToast({ title: 'Purchase Failed', message, type: 'error' });
        return null;
      } finally {
        loading.value = null;
      }
    };

  return { loading, accessResource, buyResource };
};
