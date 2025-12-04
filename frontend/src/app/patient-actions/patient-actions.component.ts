import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

interface Slot {
  slot_id: string;
  doctor_id: string;
  date: string;
  start_time: string;
  end_time: string;
  isBooked: boolean;
  patient_username: string;
}

interface DoctorSlot {
  slot_id: string;
  date: string;
  start_time: string;
  end_time: string;
}

@Component({
  selector: 'app-patient-actions',
  templateUrl: './patient-actions.component.html',
  styleUrls: ['./patient-actions.component.css'],
})
export class PatientActionsComponent implements OnInit {
  patientName: string = '';
  selectedSlots: Slot[] = [];
  doctors: string[] = [];
  selectedDoctor: string = '';
  selectedSlotId: string = '';
  doctorSlots: DoctorSlot[] = [];
  patientSlots: Slot[] = [];
  newDoctorName: string = '';
  newSlotId: string = '';
  patientSlotId: string=''
  selectedPatientSlotId: string="";
  

  constructor(
    private doctorService: DoctorService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getPatientSlots();
    this.getDoctorName();
    this.dropPatientSlots();
  }

  // Add a method to store the selected patient slot
  selectPatientSlot(slotId: string | undefined) {
    if (slotId) {
      console.log('Selected Slot ID:', slotId);
      // Optionally, you can find the selected slot object using the slotId
      this.selectedPatientSlotId = slotId;
    }
  }

// Modify the getPatientSlots() method to include the slot_id
dropPatientSlots() {
  this.http.get(`http://localhost:8000/patient_slots/`).subscribe(
    (response: any) => {
      this.patientSlots = response.slots;
      
    },
    (error: any) => {
      console.error('Error fetching patient slots:', error);
    }
  );
}

  getPatientSlots() {
    this.http.get(`http://localhost:8000/patient_slots/`).subscribe(
      (response: any) => {
        this.selectedSlots = response.slots;
        console.log(this.selectedSlots)
      },
      (error: any) => {
        console.error('Error fetching patient slots:', error);
      }
    );
  }

  getDoctorSlots(docId: string) {
    this.http.get(`http://localhost:8000/show_slots/${docId}`).subscribe(
      (res: any) => {
        this.doctorSlots = res.slots;
        console.log(this.doctorSlots);
        this.dropPatientSlots();
      },
      (error) => {
        console.error('Error fetching doctor slots:', error);
      }
    );
  }

  getDoctorName() {
    this.http.get('http://localhost:8000/select_doctor/').subscribe(
      (response: any) => {
        console.log(response);
        this.doctors = response.usernames;
      }
    );
  }

  chooseSlot() {
    // Assuming you have selected a doctor and a slot before calling this function
    
    const slotId = this.selectedSlotId;

    // Call your backend API to choose the slot
    this.http.post('http://localhost:8000/choose_slot/', {slot_id: slotId })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.dropPatientSlots();
          // Handle success (e.g., show a success message)
        },
        (error: any) => {
          console.log(slotId);
          console.error('Error choosing slot:', error);
          // Handle error (e.g., show an error message)
        }
      );
  }

  updateAppointment() {
    // Assuming you have selected a slot before calling this function
    const newDoctorName = this.newDoctorName;
    const newSlotId = this.newSlotId;
    const oldSlotId = this.selectedPatientSlotId;
  
    // Reset variables for a new selection
    
  
    // Call your backend API to update the appointment
    this.http.put('http://localhost:8000/update_appointment/', {
      newDoctorName: newDoctorName,
      newSlotId: newSlotId,
      oldSlotId: oldSlotId,
      
    })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.dropPatientSlots();
          console.log("oldslotid" + oldSlotId);
          this.getDoctorSlots(newDoctorName);
        },
        (error: any) => {
          console.log(newDoctorName);
          console.log(newSlotId);
          this.getDoctorSlots(newDoctorName);
          console.error('Error updating appointment:', error);
          // Handle error (e.g., show an error message)
        }
    );
  }

  cancelAppointment(){
    const params = new HttpParams().set('cancelSlot', this.selectedPatientSlotId);
    console.log('Parameter value:', params.get('cancelSlot'));

    this.http.delete<any>(`http://localhost:8000/cancel_appointment/`, {
      params:{cancelSlot: this.selectedPatientSlotId}
    }).subscribe(
      
      (response) => {
        console.log(response);
        this.dropPatientSlots(); // Refresh patient slots after cancellation
      },
      (error) => {
        console.error('Error canceling appointment:', error);
    })
  }

  logout() {
    console.log('hello');
    localStorage.setItem('token', 'logout');
    this.router.navigate(['sign-in']);
  }
}

