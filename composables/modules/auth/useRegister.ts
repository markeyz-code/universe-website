import { ref } from 'vue';
import { authApi } from '@/api_factory/modules/auth';
import { storageApi } from '@/api_factory/modules/storage';
import { useCustomToast } from '@/composables/core/useCustomToast';
import axios from 'axios';

export const useRegister = () => {
  const { showToast } = useCustomToast();

  const loading = ref(false);
  const uploadProgress = ref(0);
  const error = ref<string | null>(null);

  /**
   * Step 1: Upload the verification file directly to Cloudinary
   * using a signature obtained from the backend.
   */
  const uploadVerificationFile = async (file: File): Promise<string> => {
    // 1. Get signature from backend
    const { data: sigData } = await storageApi.getUploadSignature({
      folder: 'interntional/verifications',
    });

    // 2. Build FormData for Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', sigData.apiKey);
    formData.append('timestamp', sigData.timestamp.toString());
    formData.append('signature', sigData.signature);
    formData.append('folder', sigData.folder);
    if (sigData.eager) {
      formData.append('eager', sigData.eager);
    }

    // 3. Upload to Cloudinary
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${sigData.cloudName}/auto/upload`;
    
    const { data: uploadResult } = await axios.post(cloudinaryUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (e.total) uploadProgress.value = Math.round((e.loaded / e.total) * 100);
      },
    });

    return uploadResult.secure_url;
  };

  /**
   * Step 2: Register the user with the secure URL.
   */
  const register = async (payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    universityId?: string;
    programmeId?: string;
    planId?: string;
    file: File;
  }) => {
    loading.value = true;
    uploadProgress.value = 0;
    error.value = null;
    try {
      const verificationFileUrl = await uploadVerificationFile(payload.file);
      const { data } = await authApi.register({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        universityId: payload.universityId,
        programmeId: payload.programmeId,
        planId: payload.planId,
        verificationFileUrl,
      });
      showToast({
        title: 'Application Submitted!',
        message: 'Your account is pending admin approval. Check your email for updates.',
        type: 'success',
      });
      return data;
    } catch (err: any) {
      error.value = err?.data?.message || err?.response?.data?.message || err?.message || 'Registration failed. Please try again.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const sendOtp = async (email: string, firstName: string, source: string) => {
    loading.value = true;
    error.value = null;
    try {
      await authApi.sendOtp({ email, firstName, source });
      showToast({ title: 'OTP Sent', message: 'Please check your email for the verification code.', type: 'success' });
      return true;
    } catch (err: any) {
      error.value = err?.data?.message || err?.response?.data?.message || err?.message || 'Failed to send OTP.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    loading.value = true;
    error.value = null;
    try {
      await authApi.verifyOtp({ email, otp });
      showToast({ title: 'Email Verified', message: 'You can now proceed to the next step.', type: 'success' });
      return true;
    } catch (err: any) {
      error.value = err?.data?.message || err?.response?.data?.message || err?.message || 'Invalid or expired OTP.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  return { loading, uploadProgress, error, register, sendOtp, verifyOtp };
};
