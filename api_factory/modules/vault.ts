import { GATEWAY_ENDPOINT_WITH_AUTH, cachedGet } from '../axios.config';

export const vaultApi = {
  /** Get all resources optionally filtered by category */
  getResources(params?: { category?: string }) {
    return cachedGet('/resources', params);
  },

  /** Get a single resource by ID */
  getResource(id: string) {
    return GATEWAY_ENDPOINT_WITH_AUTH.get(`/resources/${id}`);
  },

  /** Get a time-limited signed download URL for a resource */
  getSignedUrl(resourceId: string) {
    return GATEWAY_ENDPOINT_WITH_AUTH.get(`/resources/${resourceId}/signed-url`);
  },

  /** Buy a premium resource */
  buyPremiumResource(resourceId: string, reference: string) {
    return GATEWAY_ENDPOINT_WITH_AUTH.post(`/resources/${resourceId}/buy`, { reference });
  },

  /** Create a new resource */
  createResource(data: any) {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/resources', data);
  }
};
