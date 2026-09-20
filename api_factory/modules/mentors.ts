import { GATEWAY_ENDPOINT_WITH_AUTH, cachedGet } from '../axios.config';

export const mentorsApi = {
  /** Get all active alumni mentors */
  getMentors() {
    return cachedGet('/users/mentors');
  },
};
