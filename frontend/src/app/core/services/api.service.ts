import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment.ts/environment.js';
import { map } from 'rxjs';
import { ApiResponse } from '../models/api.model.js';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  get<T>(url: string) {
    return this.http.get<ApiResponse<T>>(this.apiUrl + url)
    .pipe(this.mapApiData());
  }

  post<T>(url: string, body: any) {
    return this.http
    .post<ApiResponse<T>>(this.apiUrl + url, body)
    .pipe(this.mapApiData());
  }

  put<T>(url: string, body: any) {
    return this.http
    .put<ApiResponse<T>>(this.apiUrl + url, body)
    .pipe(this.mapApiData());
  }

  delete<T>(url: string) {
    return this.http
    .delete<ApiResponse<T>>(this.apiUrl + url)
    .pipe(this.mapApiData());
  }

  private mapApiData<T>() {
    return map((res: ApiResponse<T>) => res.data);
  }
  

}