import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

export class HttpRequest {
  static async post(url, data, headers, params, httpService: HttpService) {
    const result = await lastValueFrom(
      httpService.post(url, data, {
        headers: { ...headers },
        params: { ...params },
      }),
    );
    return result.data;
  }

  static async get(url, httpService: HttpService, params?, headers?) {
    const result = await lastValueFrom(
      httpService.get(url, {
        headers: { ...headers },
        params: { ...params },
      }),
    );
    return result.data;
  }
}
