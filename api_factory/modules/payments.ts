import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const paymentsApi = {
  initialize: (data: { subscriptionId: string; callbackUrl: string }) =>
    GATEWAY_ENDPOINT_WITH_AUTH.post("/payments/initialize", data),
  verify: (reference: string) =>
    GATEWAY_ENDPOINT_WITH_AUTH.get(`/payments/verify/${reference}`),
};
