import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authApi } from '@/api_factory/modules/auth';
import { useAuth } from '@/composables/core/useAuth';
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useLogin = () => {
  const router = useRouter();
  const { setAuth } = useAuth();
  const { showToast } = useCustomToast();

  const loading = ref(false);
  const error = ref<string | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await authApi.login(credentials);
      // data = { access_token: string }
      // Optionally decode or fetch /auth/me for full user object
      setAuth(data.access_token, { email: credentials.email });
      showToast({ title: 'Welcome back!', message: 'You have signed in successfully.', type: 'success' });
      await router.push('/dashboard');
      return data;
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
      showToast({ title: 'Login Failed', message: error.value!, type: 'error' });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, login };
};
