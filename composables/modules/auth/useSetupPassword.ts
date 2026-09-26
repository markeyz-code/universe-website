import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authApi } from '@/api_factory/modules/auth';
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useSetupPassword = () => {
  const router = useRouter();
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const error = ref<string | null>(null);

  const setupPassword = async (token: string, password: string) => {
    loading.value = true;
    error.value = null;
    
    try {
      await authApi.setupPassword({ token, password });
      showToast({
        title: 'Success!',
        message: 'Your password has been successfully set. You can now login.',
        type: 'success',
      });
      router.push('/login');
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to setup password.';
      showToast({ title: 'Error', message: error.value!, type: 'error' });
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, setupPassword };
};
