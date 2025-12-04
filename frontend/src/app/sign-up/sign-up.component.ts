import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  userType: boolean = true;
  registrationResponse: any;

  constructor(private router: Router, private doctorService: DoctorService) {}

  signUp() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      isDoctor: !this.userType,
    };

    this.doctorService.signUp(userData).subscribe(
      (response: any) => {
        this.registrationResponse = response;
        console.log('Sign Up Successful:', this.registrationResponse);

        // Check if the user is a doctor
        if (this.isDoctor()) {
          console.log('User is a doctor');
          // Perform actions specific to doctors
          this.router.navigate([' /doctor-schedule']);
        } else {
          console.log('User is a patient');
          // Perform actions specific to patients
          this.router.navigate([' /patient-actions']);
        }

        this.router.navigate(['/sign-in']);
      },
      (error: any) => {
        console.error('Sign Up Error:', error);
      }
    );
  }

  isDoctor(): boolean {
    return !this.userType; // If userType is false, the user is a doctor
  }
}