import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { AddPrescriptionModalComponent } from './components/modals/add-radio-modal/add-radio-modal.component';
import { RadioReportsComponent } from './components/displayRadios/radio-reports.component';


@NgModule({
  declarations: [
    // Declare traditional components here
    
  ],
  imports: [
    RadioReportsComponent,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    DynamicTableComponent, // Add standalone components here
    AddPrescriptionModalComponent, // Add standalone components here
  ],
  bootstrap: [], // Add your root component here, like AppComponent
})
export class AppModule {}
