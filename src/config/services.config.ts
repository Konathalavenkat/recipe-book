import ENV from "@/constants/env";

/**
 * Defines the structure for a service's configuration.
 */
export interface ServiceConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

/**
 * A registry to hold the configuration for all backend services.
 * Keys should match the SERVICE_TYPE enum.
 */
export type ServiceRegistry = Record<string, ServiceConfig>;

// --- SERVICE CONFIGURATION ---
// Add all your backend service configurations here.
export const SERVICE_TYPE = {
  RECIPE: 'RECIPE',
  USER: 'USER',
} as const;

export const services: ServiceRegistry = {
  [SERVICE_TYPE.RECIPE]: {
    baseURL: ENV.NEXT_PUBLIC_API_URL,
  },
  [SERVICE_TYPE.USER]: {
    baseURL: 'https://api.userservice.com/api', // Example URL
  },
};

