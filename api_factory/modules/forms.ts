import { GATEWAY_ENDPOINT } from '../axios.config';

export const formsApi = {
  getForm: (id: string) => GATEWAY_ENDPOINT.get(`/forms/${id}`),
  submitForm: (formId: string, data: any) => GATEWAY_ENDPOINT.post(`/forms/${formId}/submit`, data),
};
