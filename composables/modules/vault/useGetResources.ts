import { ref } from 'vue';
import { vaultApi } from '@/api_factory/modules/vault';
import { useCustomToast } from '@/composables/core/useCustomToast';

export interface Resource {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  fileKey: string;
  createdAt: string;
}

export const useGetResources = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const error = ref<string | null>(null);
  const resources = ref<Resource[]>([]);

  const getResources = async (params?: { category?: string; search?: string }) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await vaultApi.getResources(params);
      resources.value = data?.data || data || [];
      return resources.value;
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || 'Failed to load vault resources.';
      showToast({ title: 'Error', message: error.value!, type: 'error' });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, resources, getResources };
};
