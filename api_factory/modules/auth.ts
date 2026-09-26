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

  /** Login – returns { access_token } */
  login(data: { email: string; password: string }) {
    return GATEWAY_ENDPOINT.post('/auth/login', data);
  },

  /** Setup Password after approval */
  setupPassword(data: { token: string; password: string }) {
    return GATEWAY_ENDPOINT.post('/auth/setup-password', data);
  },

  /** Get the current logged-in user's profile */
  me() {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/auth/me');
  },
};
