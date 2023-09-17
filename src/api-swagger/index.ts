import { Api } from './generated-api/Api';
import { gs } from '../utils/sig';
import { getToken } from './auth-token';

let API_HOST = import.meta.env.VITE_API_HOST;

export const api = new Api({
  customFetch: async (path: string, options: any): Promise<Response> => {
    const newOptions = {
      ...options,
    }

    const token = getToken();
    if (token) {
      if (!newOptions.headers) {
        // @ts-ignore
        newOptions.headers = {};
      }

      newOptions.headers.Authorization = `Token ${token}`;
    }
    newOptions.headers['Content-Type'] = `application/json;charset=UTF-8`;

    const url = `${API_HOST}${path}`

    const method = options.method;
    const body = options.body;

    const queryStr = url.split('?')?.[1]
    const searchParam = new URLSearchParams(queryStr);
    const query = Object.fromEntries(searchParam.entries());

    const timestamp = Date.now();

    const sig = await gs(
      timestamp,
      method,
      path,
      query,
      JSON.parse(body)
    )

    newOptions.headers['s'] = sig
    newOptions.headers['t'] = timestamp

    try {
      const resp = await fetch(url, newOptions);
      return resp
    } catch (error: any) {
      throw error;
    }
  }
})

export default api;
