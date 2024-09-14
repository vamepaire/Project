import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { _MatInternalFormField } from '@angular/material/core';
import { BusinessServiceService } from '../services/business-service.service';
import { data_structure } from '../../sign_up_data_types';

@Component({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-business',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './business.component.html',
  styleUrl: './business.component.css'
})
export class BusinessComponent {
  businessName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;

  constructor(private business: BusinessServiceService) {}

  sign(data: { [key: string]: any }): void {
    const formData: data_structure = {
      business_name: data['businessName'],
      email: data['email'],
      password: data['password'],
      confirm_pass: data['confirmPassword']
    };

    console.warn(formData);
    this.business.business_signup(formData).subscribe((result) => {
      console.warn('Response:', result);
    });
  }
}