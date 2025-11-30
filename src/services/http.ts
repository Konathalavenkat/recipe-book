import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { services, SERVICE_TYPE, ServiceConfig } from '@/config/services.config';

/**
 * Defines the options for a specific API call.
 * @template D The type of the request body data.
 */
export interface RequestOptions<D = any> {
  params?: any; // URL query parameters
  headers?: Record<string, string>;
  data?: D;
}

/**
 * An Axios wrapper to handle API calls with dynamic configurations.
 * Interceptors are set up to globally handle requests and responses.
 */
class HttpService {
  private static instance: HttpService;
  private readonly axiosInstance: AxiosInstance;

  private constructor() {
    // The base axios instance is created without a baseURL,
    // as it will be provided dynamically for each request.
    this.axiosInstance = axios.create();
    this.initializeInterceptors();
  }

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }

    return HttpService.instance;
  }

  private getServiceConfig(serviceType: keyof typeof SERVICE_TYPE): ServiceConfig {
    const config = services[serviceType];
    if (!config) throw new Error(`Service configuration for "${serviceType}" not found.`);
    return config;
  }
  /**
   * Initializes request and response interceptors.
   */
  private initializeInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // You can still add global logic here, e.g., logging or adding a token.
        // The config passed to the `request` method will be available here.
        return config;
      },
      (error) => {
        console.error('Request Interceptor Error:', error);
        return Promise.reject(error);
      }
    );
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error) => {
        if (error.response) {
          const { status, data } = error.response;
          switch (status) {
            case 401:
              console.error('Unauthorized access - 401', data);
              break;
            case 403:
              console.error('Forbidden - 403', data);
              break;
            case 404:
              console.error('Not Found - 404', data);
              break;
            default:
              console.error(`Error ${status}`, data);
              break;
          }
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  private async request<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    serviceType: keyof typeof SERVICE_TYPE,
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const serviceConfig = this.getServiceConfig(serviceType);

    const config: AxiosRequestConfig = {
      method,
      baseURL: serviceConfig.baseURL,
      url: path,
      params: options.params,
      data: options.data,
      headers: {
        ...serviceConfig.headers, // Default headers for the service
        ...options.headers,       // Request-specific headers (will override defaults)
      },
    };

    return this.axiosInstance.request<T, T>(config);
  }

  public get<T>(
    serviceType: keyof typeof SERVICE_TYPE,
    path: string,
    options?: Omit<RequestOptions, 'data'>
  ): Promise<T> {
    return this.request<T>('get', serviceType, path, options);
  }

  public post<T, D>(
    serviceType: keyof typeof SERVICE_TYPE,
    path: string,
    options?: RequestOptions<D>
  ): Promise<T> {
    return this.request<T>('post', serviceType, path, options);
  }

  public put<T, D>(
    serviceType: keyof typeof SERVICE_TYPE,
    path: string,
    options?: RequestOptions<D>
  ): Promise<T> {
    return this.request<T>('put', serviceType, path, options);
  }

  public delete<T>(
    serviceType: keyof typeof SERVICE_TYPE,
    path: string,
    options?: Omit<RequestOptions, 'data'>
  ): Promise<T> {
    return this.request<T>('delete', serviceType, path, options);
  }
}

// Export a single instance for the entire application to use.
const Http = HttpService.getInstance();

export { SERVICE_TYPE };
export default Http;
