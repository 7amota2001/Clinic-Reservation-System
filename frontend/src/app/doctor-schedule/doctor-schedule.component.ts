import { Component } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.css'],
})
export class DoctorScheduleComponent {
  date: string = '';
  startTime: string = '';
  endTime: string = '';
  addSlotResponse: any; // Variable to store the HTTP response

  constructor(private doctorService: DoctorService,
            private http: HttpClient,
            private router: Router) {}

  addSlot() {
    const slotData = {
      date: this.date,
      start_time: this.startTime,
      end_time: this.endTime,
      isBooked: false, // Assuming the initial state is not booked
    };

    this.doctorService.addSlot(slotData).subscribe(
      (response: any) => {
        this.addSlotResponse = response;
        console.log('Slot added successfully:', this.addSlotResponse);
        // Handle success, e.g., show a success message
        // You can access specific properties of the response if needed
      },
      (error: any) => {
        this.addSlotResponse = error;
        console.error('Error adding slot:', this.addSlotResponse);
        // Handle error, e.g., show an error message
        // You can access specific properties of the error if needed
      }
    );
  }

  logout() {
    console.log('hello');
    localStorage.setItem('token', 'logout');
    this.router.navigate(['sign-in']);
  }
}