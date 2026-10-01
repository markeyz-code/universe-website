import { GATEWAY_ENDPOINT_WITH_AUTH, cachedGet } from '../axios.config';

export const jobsApi = {
  /** Get all jobs */
  getJobs(params?: any) {
    return cachedGet('/jobs', params);
  },

  /** Create a job (Admin) */
  createJob(data: {
    title: string;
    company: string;
    location: string;
    description: string;
    link: string;
  }) {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/jobs', data);
  },

  /** Delete a job (Admin) */
  deleteJob(id: string) {
    return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/jobs/${id}`);
  },

  /** Update a job (Admin) */
  updateJob(id: string, payload: any) {
    return GATEWAY_ENDPOINT_WITH_AUTH.patch(`/jobs/${id}`, payload);
  },

  /** Apply for a job */
  applyJob(data: any) {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/jobs/apply', data);
  },
};
