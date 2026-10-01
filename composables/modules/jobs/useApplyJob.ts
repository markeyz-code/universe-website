import { ref } from 'vue';
import { jobsApi } from '@/api_factory/modules/jobs';
import { storageApi } from '@/api_factory/modules/storage';
import { useCustomToast } from '@/composables/core/useCustomToast';
import axios from 'axios';

export const useApplyJob = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const uploadProgress = ref(0);

  const uploadCV = async (file: File): Promise<string> => {
    const { data: sigData } = await storageApi.getUploadSignature({
      folder: 'universe/resumes',
    });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', sigData.apiKey);
    formData.append('timestamp', sigData.timestamp.toString());
    formData.append('signature', sigData.signature);
    formData.append('folder', sigData.folder);
    if (sigData.eager) {
      formData.append('eager', sigData.eager);
    }

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${sigData.cloudName}/auto/upload`;
    
    const { data: uploadResult } = await axios.post(cloudinaryUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (e.total) uploadProgress.value = Math.round((e.loaded / e.total) * 100);
      },
    });

    return uploadResult.secure_url;
  };

  const applyForJob = async (payload: {
    jobId: string;
    jobTitle: string;
    name: string;
    email: string;
    file: File;
  }) => {
    loading.value = true;
    uploadProgress.value = 0;
    try {
      const cvUrl = await uploadCV(payload.file);
      const { data } = await jobsApi.applyJob({
        jobId: payload.jobId,
        jobTitle: payload.jobTitle,
        name: payload.name,
        email: payload.email,
        cvUrl,
      });
      showToast({
        title: 'Application Submitted!',
        message: 'Your application has been successfully submitted.',
        type: 'success',
      });
      return data;
    } catch (err: any) {
      showToast({
        title: 'Application Failed',
        message: err?.response?.data?.message || err?.message || 'Could not submit application.',
        type: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, uploadProgress, applyForJob };
};
