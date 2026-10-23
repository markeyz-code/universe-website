import { GATEWAY_ENDPOINT } from '../axios.config';

export const siteSettingsApi = {
  getSettings(platform: string = 'universe') {
    return GATEWAY_ENDPOINT.get(`/site-settings/${platform}`);
  },
};
