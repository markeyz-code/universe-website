import { ref, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { authApi } from '@/api_factory/modules/auth';
import { useAuth } from '@/composables/core/useAuth';
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useLogin = () => {
  const router = useRouter();
  const route = useRoute();
  const { setAuth, fetchUserProfile } = useAuth();
  const { showToast } = useCustomToast();

  const step = ref<'credentials' | 'otp'>('credentials');
  const loading = ref(false);
  const verifying = ref(false);
  const resending = ref(false);
  const error = ref<string | null>(null);
  const otpError = ref<string | null>(null);

  const showApprovalModal = ref(false);

  // Resend cooldown timer (60s)
  const resendCountdown = ref(0);
  let resendInterval: ReturnType<typeof setInterval> | null = null;

  // OTP Expiration timer (10 minutes = 600s)
  const otpTimeRemaining = ref(600);
  const isOtpExpired = ref(false);
  let expirationInterval: ReturnType<typeof setInterval> | null = null;

  const startResendTimer = (seconds: number = 60) => {
    if (resendInterval) clearInterval(resendInterval);
    resendCountdown.value = seconds;
    resendInterval = setInterval(() => {
      resendCountdown.value--;
      if (resendCountdown.value <= 0 && resendInterval) {
        clearInterval(resendInterval);
        resendInterval = null;
      }
    }, 1000);
  };

  const startExpirationTimer = (seconds: number = 600) => {
    if (expirationInterval) clearInterval(expirationInterval);
    otpTimeRemaining.value = seconds;
    isOtpExpired.value = false;
    expirationInterval = setInterval(() => {
      otpTimeRemaining.value--;
      if (otpTimeRemaining.value <= 0) {
        isOtpExpired.value = true;
        if (expirationInterval) {
          clearInterval(expirationInterval);
          expirationInterval = null;
        }
      }
    }, 1000);
  };

  const stopAllTimers = () => {
    if (resendInterval) {
      clearInterval(resendInterval);
      resendInterval = null;
    }
    if (expirationInterval) {
      clearInterval(expirationInterval);
      expirationInterval = null;
    }
  };

  onUnmounted(() => {
    stopAllTimers();
  });

  /** Step 1: Submit email + password to trigger OTP */
  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true;
    error.value = null;
    otpError.value = null;
    showApprovalModal.value = false;

    try {
      const response = await authApi.login({
        email: credentials.email,
        password: credentials.password,
        source: 'universe',
      });
      const data = response?.data || response;

      // When backend requires OTP
      if (data?.requireOtp) {
        step.value = 'otp';
        startResendTimer(60);
        startExpirationTimer(600); // 10 minutes TTL matching backend cache
        showToast({
          title: 'Code Sent',
          message: `A 6-digit verification code was sent to ${credentials.email}`,
          type: 'success',
        });
        return { requireOtp: true };
      }

      // Fallback if OTP is bypassed on certain tiers
      if (data?.access_token) {
        setAuth(data.access_token, data.user || { email: credentials.email });
        fetchUserProfile().catch(() => {});
        showToast({ title: 'Welcome back!', message: 'Signed in successfully.', type: 'success' });
        const redirect = (route.query.redirect as string) || '/dashboard/overview';
        await router.push(redirect);
        return data;
      }

      return data;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.data?.message || err?.data?.error || err?.message || 'Authentication failed. Please check your credentials.';
      if (errorMessage.toLowerCase().includes('pending approval')) {
        showApprovalModal.value = true;
      }
      error.value = errorMessage;
      return null;
    } finally {
      loading.value = false;
    }
  };

  /** Step 2: Verify the 6-digit OTP to complete login */
  const verifyOtp = async (email: string, otp: string) => {
    if (isOtpExpired.value) {
      otpError.value = 'This verification code has expired. Please request a new code.';
      return null;
    }

    if (!otp || otp.length !== 6) {
      otpError.value = 'Please enter all 6 digits of your verification code.';
      return null;
    }

    verifying.value = true;
    otpError.value = null;

    try {
      const response = await authApi.verifyLoginOtp({ email, otp });
      const data = response?.data || response;

      if (!data?.access_token) {
        throw new Error('Missing access token in server response.');
      }

      stopAllTimers();
      setAuth(data.access_token, data.user || { email });
      fetchUserProfile().catch(() => {});

      showToast({
        title: 'Verified!',
        message: `Welcome back, ${data.user?.firstName || 'Member'}!`,
        type: 'success',
      });

      const redirect = (route.query.redirect as string) || '/dashboard/overview';
      await router.push(redirect);
      return data;
    } catch (err: any) {
      otpError.value =
        err?.response?.data?.message ||
        err?.data?.message ||
        err?.data?.error ||
        err?.message ||
        'Invalid verification code. Please check and try again.';
      return null;
    } finally {
      verifying.value = false;
    }
  };

  /** Resend a fresh OTP */
  const resendOtp = async (email: string) => {
    if (resendCountdown.value > 0 || resending.value) return;

    resending.value = true;
    otpError.value = null;

    try {
      await authApi.resendLoginOtp({ email, source: 'universe' });
      startResendTimer(60);
      startExpirationTimer(600);
      showToast({
        title: 'New Code Sent',
        message: `A fresh 6-digit verification code was sent to ${email}`,
        type: 'success',
      });
    } catch (err: any) {
      otpError.value =
        err?.response?.data?.message ||
        err?.data?.message ||
        err?.message ||
        'Failed to resend code. Please try again.';
    } finally {
      resending.value = false;
    }
  };

  const backToCredentials = () => {
    stopAllTimers();
    step.value = 'credentials';
    otpError.value = null;
  };

  return {
    step,
    loading,
    verifying,
    resending,
    error,
    otpError,
    resendCountdown,
    otpTimeRemaining,
    isOtpExpired,
    showApprovalModal,
    login,
    verifyOtp,
    resendOtp,
    backToCredentials,
  };
};
