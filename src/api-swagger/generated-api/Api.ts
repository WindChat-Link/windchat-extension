/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GetManyCrudItemResponseDto {
  data: CrudItem[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export type CrudItem = object;

export type ActivateDto = object;

export type DeactivateDto = object;

export type ListKeyInstancesDto = object;

export type CheckDto = object;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Cats example
 * @version 1.0
 * @contact
 *
 * The cats API description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerDaily
   * @request POST:/
   */
  appControllerDaily = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "POST",
      ...params,
    });

  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  hello = {
    /**
     * No description
     *
     * @name AppControllerHello
     * @request GET:/hello
     */
    appControllerHello: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/hello`,
        method: "GET",
        ...params,
      }),
  };
  lemonLog = {
    /**
     * No description
     *
     * @name GetManyBaseLemonLogControllerCrudItem
     * @summary Retrieve multiple CrudItems
     * @request GET:/lemon_log
     */
    getManyBaseLemonLogControllerCrudItem: (
      query?: {
        /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
        fields?: string[];
        /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
        s?: string;
        /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
        filter?: string[];
        /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
        or?: string[];
        /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
        sort?: string[];
        /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
        join?: string[];
        /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
        limit?: number;
        /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
        offset?: number;
        /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
        page?: number;
        /**
         * Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
         * @min 0
         * @max 1
         */
        cache?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetManyCrudItemResponseDto | CrudItem[], any>({
        path: `/lemon_log`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CreateOneBaseLemonLogControllerCrudItem
     * @summary Create a single CrudItem
     * @request POST:/lemon_log
     */
    createOneBaseLemonLogControllerCrudItem: (data: CrudItem, params: RequestParams = {}) =>
      this.request<CrudItem, any>({
        path: `/lemon_log`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name GetOneBaseLemonLogControllerCrudItem
     * @summary Retrieve a single CrudItem
     * @request GET:/lemon_log/{id}
     */
    getOneBaseLemonLogControllerCrudItem: (
      id: string,
      query?: {
        /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
        fields?: string[];
        /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
        join?: string[];
        /**
         * Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
         * @min 0
         * @max 1
         */
        cache?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CrudItem, any>({
        path: `/lemon_log/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UpdateOneBaseLemonLogControllerCrudItem
     * @summary Update a single CrudItem
     * @request PATCH:/lemon_log/{id}
     */
    updateOneBaseLemonLogControllerCrudItem: (id: string, data: CrudItem, params: RequestParams = {}) =>
      this.request<CrudItem, any>({
        path: `/lemon_log/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteOneBaseLemonLogControllerCrudItem
     * @summary Delete a single CrudItem
     * @request DELETE:/lemon_log/{id}
     */
    deleteOneBaseLemonLogControllerCrudItem: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lemon_log/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  keyInstance = {
    /**
     * No description
     *
     * @name KeyInstanceControllerActivate
     * @request POST:/key_instance/activate
     */
    keyInstanceControllerActivate: (data: ActivateDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/key_instance/activate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name KeyInstanceControllerDeactivate
     * @request POST:/key_instance/deactivate
     */
    keyInstanceControllerDeactivate: (data: DeactivateDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/key_instance/deactivate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name KeyInstanceControllerListKeys
     * @request POST:/key_instance/list_keys
     */
    keyInstanceControllerListKeys: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/key_instance/list_keys`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @name KeyInstanceControllerListInstances
     * @request POST:/key_instance/list_instances
     */
    keyInstanceControllerListInstances: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/key_instance/list_instances`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @name KeyInstanceControllerListkeyInstances
     * @request POST:/key_instance/list_key_instances
     */
    keyInstanceControllerListkeyInstances: (data: ListKeyInstancesDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/key_instance/list_key_instances`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name KeyInstanceControllerCheck
     * @request POST:/key_instance/check
     */
    keyInstanceControllerCheck: (data: CheckDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/key_instance/check`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
