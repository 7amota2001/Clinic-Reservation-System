import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = 'http://127.0.0.1:8000/'; // Replace with your actual backend API base URL

  constructor(private httpClient: HttpClient) {}

  
  signUp(userData: any): Observable<any> {
    const url = `${this.baseUrl}sign_up_view/`;
    return this.httpClient.post(url, userData);
  }

  signIn(userData: any): Observable<any> {
    const url = `${this.baseUrl}sign_in/`;
    return this.httpClient.post(url, userData);
  }

  addSlot(slot: any): Observable<any> {
    const url = `${this.baseUrl}insert_slot/`;
    return this.httpClient.post(url, slot);
  }

  getDoctorId(username: string): Observable<any> {
    const url = `${this.baseUrl}select_doctor/`;
    return this.httpClient.post(url, { username });
  }

  getAvailableSlots(doctorId: string): Observable<any> {
    const url = `${this.baseUrl}get_available_slots/`;
    return this.httpClient.get(`${url}?doctor_id=${doctorId}`);
  }

  chooseSlot(slotData: any): Observable<any> {
    const url = `${this.baseUrl}choose_slot/`;
    return this.httpClient.post(url, slotData);
  }

  updateAppointment(appointmentData: any): Observable<any> {
    const url = `${this.baseUrl}update_appointment/`;
    return this.httpClient.post(url, appointmentData);
  }
  
  getPatientSlots(patientName: string): Observable<any> {
    const url = `${this.baseUrl}patient_slots/`;
    return this.httpClient.get(`${url}?patient_name=${patientName}`);
  }

  cancelAppointment(patientUsername: string): Observable<any> {
    const url = `${this.baseUrl}cancel_appointment/`;
    return this.httpClient.post(url, { patient_username: patientUsername });
  }
}

  
