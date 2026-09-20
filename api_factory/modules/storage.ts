import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const storageApi = {
  /**
   * Request a Cloudinary upload signature from the backend.
   * Returns { timestamp, signature, folder, cloudName, apiKey }
   */
  getUploadSignature(data: { folder: string }) {
    // We can use GATEWAY_ENDPOINT_WITH_AUTH for both logged-in and logged-out flows
    // if the endpoint doesn't require @UseGuards(AuthGuard('jwt'))
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/storage/signature', data);
  },
};
