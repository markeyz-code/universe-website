import { GATEWAY_ENDPOINT_WITH_AUTH, cachedGet } from '../axios.config';

export const mentorsApi = {
  /** Get all active alumni mentors */
  getMentors() {
    return cachedGet('/users/mentors');
  },
  /** Request a mentor */
  requestMentorship(payload: any) {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/mentorship/request', payload);
  },
  /** Get current user mentorship status */
  getMyStatus(application: string) {
    return GATEWAY_ENDPOINT_WITH_AUTH.get(`/mentorship/my-status?application=${application}`);
  }
};
