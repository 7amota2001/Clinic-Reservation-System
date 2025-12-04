// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { SignInComponent } from './sign-in/sign-in.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     SignInComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
// app.module.ts

// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DoctorScheduleComponent } from './doctor-schedule/doctor-schedule.component';
import { PatientActionsComponent } from './patient-actions/patient-actions.component'; // Import the PatientActionsComponent
import { DoctorService } from './services/doctor.service'; // Import DoctorService
import { AuthInterceptorService } from './auth-interceptor-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DoctorScheduleComponent,
    PatientActionsComponent, // Include the PatientActionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    DoctorService], // Provide DoctorService
  bootstrap: [AppComponent],
})
export class AppModule {}



