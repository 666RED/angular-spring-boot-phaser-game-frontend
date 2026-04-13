import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpOptions } from '../../../shared/models/http.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/v1';

  private url(path: string): string {
    // avoid double slash
    return `${this.baseUrl}${path.startsWith('/') ? path : '/' + path}`;
  }

  get<T>(path: string, options?: HttpOptions) {
    return this.http.get<T>(this.url(path), options);
  }

  post<T>(path: string, body: any, options?: HttpOptions) {
    return this.http.post<T>(this.url(path), body, options);
  }

  put<T>(path: string, body: any, options?: HttpOptions) {
    return this.http.put<T>(this.url(path), body, options);
  }

  patch<T>(path: string, body: any, options?: HttpOptions) {
    return this.http.patch<T>(this.url(path), body, options);
  }

  delete<T>(path: string, options?: any) {
    return this.http.delete<T>(this.url(path), options);
  }
}
