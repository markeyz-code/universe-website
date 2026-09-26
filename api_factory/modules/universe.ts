import { GATEWAY_ENDPOINT } from '../axios.config';

export const universeApi = {
  getUniversities() {
    return GATEWAY_ENDPOINT.get('/universe/universities');
  },
  getProgrammes() {
    return GATEWAY_ENDPOINT.get('/universe/programmes');
  }
};
