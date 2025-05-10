// filepath: /Users/macbook/Documents/burrito-bull-shop/types/woocommerce-rest-api.d.ts
declare module "@woocommerce/woocommerce-rest-api" {
  export default class WooCommerceRestApi {
    constructor(options: {
      url: string;
      consumerKey: string;
      consumerSecret: string;
      version?: string;
      queryStringAuth?: boolean;
    });

    get(endpoint: string, params?: Record<string, any>): Promise<any>;
    post(endpoint: string, data: Record<string, any>): Promise<any>;
    put(endpoint: string, data: Record<string, any>): Promise<any>;
    delete(endpoint: string, params?: Record<string, any>): Promise<any>;
    options(endpoint: string, params?: Record<string, any>): Promise<any>;
  }
}