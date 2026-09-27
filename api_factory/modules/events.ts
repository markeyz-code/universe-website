import { GATEWAY_ENDPOINT } from '../axios.config';

export const eventsApi = {
  getEvents() {
    return GATEWAY_ENDPOINT.get('/events');
  },
  getEvent(id: string) {
    return GATEWAY_ENDPOINT.get(`/events/${id}`);
  }
};
