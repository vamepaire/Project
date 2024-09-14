import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { data_structure } from '../../sign_up_data_types';

@Injectable({
  providedIn: 'root'
})
export class BusinessServiceService {
  private apiUrl = 'http://localhost:3000/sign_up_data';

  constructor(private http: HttpClient) { }

  business_signup(data: data_structure) {
    console.warn(data);
    return this.http.post(this.apiUrl, data);
  }
}
