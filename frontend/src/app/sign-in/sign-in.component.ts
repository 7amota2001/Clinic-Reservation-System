import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  username: string = '';
  password: string = '';
  loginResponse: any;

  constructor(private router: Router, private doctorService: DoctorService) {}

  navigateToSignUp() {
    this.router.navigate(['sign-up']);
  }

  signin() {
    const userData = {
      username: this.username,
      password: this.password,
    };

    this.doctorService.signIn(userData).subscribe(
      (response: any) => {
        this.loginResponse = response;
        console.log('Sign In Successful:', this.loginResponse);
        localStorage.setItem('token', this.loginResponse.token);
        // Check if the user is a doctor
        if (this.loginResponse.isDoctor) {
          console.log('User is a doctor');
          // Perform actions specific to doctors
          this.router.navigate(['/doctor-schedule']);
        } else {
          console.log('User is a patient');
          // Perform actions specific to patients
          this.router.navigate(['/patient-actions']);
        }
      },
      (error: any) => {
        console.error('Sign In Error:', error);
      }
    );
  }
}

  
