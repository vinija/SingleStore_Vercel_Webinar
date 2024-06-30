declare module '@singlestore/http-client' {
  export class ApiClient {
    static instance: ApiClient;
    authentications: { [key: string]: any };
    basePath: string;
  }

  export class HttpApi {
    rows(args: { queryInput: { database: string; sql: string; parameters?: any[] } }): Promise<any>;
  }
}
