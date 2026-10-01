import { GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const authApi = {
  /** Register a new intern – sends verificationFileUrl (DO Spaces key) */
  register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    verificationFileUrl: string;
  }) {
    return GATEWAY_ENDPOINT.post('/auth/register', data);
  },

  /** Login – validates credentials, triggers OTP */
  login(data: { email: string; password: string; source?: string }) {
    return GATEWAY_ENDPOINT.post('/auth/login', data);
  },

  /** Verify Login OTP – returns { access_token, user } */
  verifyLoginOtp(data: { email: string; otp: string }) {
    return GATEWAY_ENDPOINT.post('/auth/login/verify-otp', data);
  },

  /** Resend Login OTP */
  resendLoginOtp(data: { email: string; source?: string }) {
    return GATEWAY_ENDPOINT.post('/auth/login/resend-otp', data);
  },

  /** Setup Password after approval */
  setupPassword(data: { token: string; password: string }) {
    return GATEWAY_ENDPOINT.post('/auth/setup-password', data);
  },

  /** Get the current logged-in user's profile */
  me() {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/auth/me');
  },

  /** Send OTP for email verification */
  sendOtp(data: { email: string; firstName: string; source?: string }) {
    return GATEWAY_ENDPOINT.post('/auth/send-otp', data);
  },

  /** Verify OTP */
  verifyOtp(data: { email: string; otp: string }) {
    return GATEWAY_ENDPOINT.post('/auth/verify-otp', data);
  },

  /** Forgot Password */
  forgotPassword(data: { email: string; source?: string }) {
    return GATEWAY_ENDPOINT.post('/auth/forgot-password', data);
  },

  /** Reset Password */
  resetPassword(data: { token: string; password: string }) {
    return GATEWAY_ENDPOINT.post('/auth/reset-password', data);
  },
};
