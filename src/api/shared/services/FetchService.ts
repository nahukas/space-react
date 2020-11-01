import { API_URL } from '../../../config/general-config';

interface FetchParams {
  url: string;
  body?: object;
  headers?: object;
}

class FetchService {
  public static async get<T>(
    params: FetchParams,
    baseUrl = API_URL
  ): Promise<T> {
    let { url } = params;

    const response = await FetchService.fetchWithRefresh(`${baseUrl}${url}`, {
      method: 'GET',
      headers: await FetchService.getHeaders(),
    });

    return FetchService.processResponse<T>(response);
  }

  public static async post<T>(
    params: FetchParams,
    baseUrl = API_URL
  ): Promise<T> {
    const { url } = params;
    const response = await FetchService.fetchWithRefresh(`${baseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(params.body),
      headers: await FetchService.getHeaders(params.headers),
    });

    return FetchService.processResponse<T>(response);
  }

  public static async put<T>(
    params: FetchParams,
    baseUrl = API_URL
  ): Promise<T> {
    const { url } = params;

    const response = await FetchService.fetchWithRefresh(`${baseUrl}${url}`, {
      method: 'PUT',
      body: JSON.stringify(params.body),
      headers: await FetchService.getHeaders(),
    });

    return FetchService.processResponse<T>(response);
  }

  public static async delete<T>(params: FetchParams): Promise<T> {
    const { url } = params;

    const response = await FetchService.fetchWithRefresh(`${API_URL}${url}`, {
      method: 'DELETE',
      headers: await FetchService.getHeaders(),
      body: JSON.stringify(params.body),
    });

    return FetchService.processResponse<T>(response);
  }

  public static async getHeaders(headersParams?: object) {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    return headers;
  }

  public static async fetchWithRefresh(
    url: RequestInfo,
    config: RequestInit | undefined
  ): Promise<Response> {
    let response = await fetch(url, config);
    if (response.status === 401) {
      if (config) {
        config.headers = await FetchService.getHeaders();
      }
      response = await fetch(url, config);
    }
    return response;
  }

  public static async processResponse<T>(response: Response) {
    if (response.status === 200) {
      return (await response.json()) as T;
    }

    if (response.status === 400) {
      throw new Error('Bad Request [400]');
    }

    if (response.status === 404) {
      throw new Error('Endpoint not found [404]');
    }

    if (response.status === 405) {
      throw new Error('Method Not Allowed [405]');
    }

    if (response.status === 500) {
      throw new Error('Internal Server Error [500]');
    }

    return {} as T;
  }
}

export default FetchService;
