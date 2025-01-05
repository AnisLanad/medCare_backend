import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor.service';
import { NurseService } from '../../services/nurses.service';
import { LabService } from '../../services/lab.services';
import { PatientService } from '../../services/patient.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddDoctorComponent } from '@app/components/add-patient/add-doctor.component';
import { AddNurseComponent } from '@app/components/add-patient/add-nurse.component';
import { AddLabComponent } from '@app/components/add-patient/add-lab.component';
import { AddPatientComponent } from '@app/components/add-patient/add-patient.component';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { PieController, ArcElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

// Register the required components
Chart.register(...registerables, PieController, ArcElement, LinearScale, CategoryScale, Tooltip, Legend);

interface DashboardStats {
  doctors: number;
  nurses: number;
  labs: number;
  patients: number;
}

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, AddDoctorComponent, AddNurseComponent, AddLabComponent, AddPatientComponent, BaseChartDirective],
  template: `
    <div class="p-6 max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
        <p class="mt-2 text-gray-600">Welcome to your hospital management system</p>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Doctors Card -->
        <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
             (click)="navigateTo('doctors')">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Doctors</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats?.doctors || 0 }}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <i class="fas fa-user-md text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <!-- Nurses Card -->
        <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
             (click)="navigateTo('nurses')">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Nurses</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats?.nurses || 0 }}</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <i class="fas fa-user-nurse text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <!-- Labs Card -->
        <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
             (click)="navigateTo('labs')">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Labs</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats?.labs || 0 }}</p>
            </div>
            <div class="p-3 bg-purple-100 rounded-full">
              <i class="fas fa-flask text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>

        <!-- Patients Card -->
        <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
             (click)="navigateTo('patients')">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Patients</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats?.patients || 0 }}</p>
            </div>
            <div class="p-3 bg-red-100 rounded-full">
              <i class="fas fa-hospital-user text-red-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            (click)="showAddDoctor()"
            class="p-4 text-center rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
            <i class="fas fa-plus-circle text-blue-600 mb-2"></i>
            <p class="text-sm font-medium text-gray-900">Add Doctor</p>
          </button>
          <button
            (click)="showAddNurse()"
            class="p-4 text-center rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
            <i class="fas fa-plus-circle text-green-600 mb-2"></i>
            <p class="text-sm font-medium text-gray-900">Add Nurse</p>
          </button>
          <button
            (click)="showAddLab()"
            class="p-4 text-center rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
            <i class="fas fa-plus-circle text-purple-600 mb-2"></i>
            <p class="text-sm font-medium text-gray-900">Add Lab</p>
          </button>
          <button
            (click)="showAddPatient()"
            class="p-4 text-center rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
            <i class="fas fa-plus-circle text-red-600 mb-2"></i>
            <p class="text-sm font-medium text-gray-900">Add Patient</p>
          </button>
        </div>
      </div>

      <!-- Graphs Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Doctors by Specialty Pie Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Doctors by Specialty</h2>
          @if (doctorsBySpecialtyChartData) {
            <canvas baseChart
                    [type]="'pie'"
                    [data]="doctorsBySpecialtyChartData"
                    class="chart-canvas">
            </canvas>
          } @else {
            <p class="text-gray-600">Loading chart data...</p>
          }
        </div>

        <!-- Patients by Age Group Bar Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Patients by Age Group</h2>
          @if (patientsByAgeGroupChartData) {
            <canvas baseChart
                    [type]="'bar'"
                    [data]="patientsByAgeGroupChartData"
                    [plugins]="barChartPlugins"
                    class="chart-canvas">
            </canvas>
          } @else {
            <p class="text-gray-600">Loading chart data...</p>
          }
        </div>
      </div>

      <!-- Add Modals -->
      <app-add-doctor
        [isVisible]="isAddDoctorVisible"
        (close)="hideAddDoctor()"
        (add)="handleAddDoctor($event)"
      ></app-add-doctor>

      <app-add-nurse
        [isVisible]="isAddNurseVisible"
        (close)="hideAddNurse()"
        (add)="handleAddNurse()"
      ></app-add-nurse>

      <app-add-lab
        [isVisible]="isAddLabVisible"
        (close)="hideAddLab()"
        (add)="handleAddLab($event)"
      ></app-add-lab>

      <app-add-patient
        [isVisible]="isAddPatientVisible"
        (close)="hideAddPatient()"
        (add)="handleAddPatient($event)"
      ></app-add-patient>
    </div>
  `,
  styles: [
    `
      .chart-canvas {
        width: 100% !important;
        height: 300px !important;
      }
    `,
  ],
})
export class DashboardHomeComponent implements OnInit {
  stats: DashboardStats | null = null;

  // Visibility flags for each add popup
  isAddDoctorVisible = false;
  isAddNurseVisible = false;
  isAddLabVisible = false;
  isAddPatientVisible = false;

  // Chart Data
  doctorsBySpecialtyChartData: any;
  patientsByAgeGroupChartData: any;

  // Chart Options
  barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const, // Use 'as const' to ensure the type is inferred correctly
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const, // Use 'as const' to ensure the type is inferred correctly
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  barChartPlugins = [];

  constructor(
    private doctorService: DoctorService,
    private nurseService: NurseService,
    private labService: LabService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadCharts();
  }

  private loadStats(): void {
    combineLatest([
      this.doctorService.getDoctors(),
      this.nurseService.getNurses(),
      this.labService.getLabs(),
      this.patientService.getPatients()
    ]).pipe(
      map(([doctors, nurses, labs, patients]) => ({
        doctors: doctors.length,
        nurses: nurses.length,
        labs: labs.length,
        patients: patients.length
      }))
    ).subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
      }
    });
  }

  private loadCharts(): void {
    // Load Doctors by Specialty Data
    this.doctorService.getDoctors().subscribe((doctors) => {
      const specialties = doctors.map((doctor) => doctor.specialtyDisplay);
      const specialtyCounts = this.countBy(specialties);

      this.doctorsBySpecialtyChartData = {
        labels: Object.keys(specialtyCounts),
        datasets: [
          {
            label: 'Doctors',
            data: Object.values(specialtyCounts),
            backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#f59e0b'],
          },
        ],
      };
    });

    // Load Patients by Age Group Data
    this.patientService.getPatients().subscribe((patients) => {
      const ageGroups = patients.map((patient) => this.getAgeGroup(patient.age || 0));
      const ageGroupCounts = this.countBy(ageGroups);

      this.patientsByAgeGroupChartData = {
        labels: Object.keys(ageGroupCounts),
        datasets: [
          {
            label: 'Patients',
            data: Object.values(ageGroupCounts),
            backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#f59e0b'],
          },
        ],
      };
    });
  }

  private countBy(array: string[]): { [key: string]: number } {
    return array.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  private getAgeGroup(age: number): string {
    if (age <= 18) return '0-18';
    if (age <= 35) return '19-35';
    if (age <= 50) return '36-50';
    return '51+';
  }

  // Navigation method if you still need to navigate on card click
  navigateTo(section: string): void {
    console.log(`Navigate to ${section}`);
  }

  // Methods to show popups
  showAddDoctor() {
    this.isAddDoctorVisible = true;
  }

  showAddNurse() {
    this.isAddNurseVisible = true;
  }

  showAddLab() {
    this.isAddLabVisible = true;
  }

  showAddPatient() {
    this.isAddPatientVisible = true;
  }

  // Methods to hide popups
  hideAddDoctor() {
    this.isAddDoctorVisible = false;
  }

  hideAddNurse() {
    this.isAddNurseVisible = false;
  }

  hideAddLab() {
    this.isAddLabVisible = false;
  }

  hideAddPatient() {
    this.isAddPatientVisible = false;
  }

  // Handlers for add events
  handleAddDoctor(doctor: any) {
    this.doctorService.addDoctor(doctor).subscribe({
      next: (newDoctor) => {
        console.log('Doctor added successfully:', newDoctor);
        this.loadStats(); // Refresh stats
        this.hideAddDoctor();
      },
      error: (error) => {
        console.error('Error adding doctor:', error);
      },
    });
  }

  handleAddNurse() {
    this.hideAddNurse();
  }

  handleAddLab(lab: any) {
    this.labService.addLab(lab).subscribe({
      next: (newLab) => {
        console.log('Lab added successfully:', newLab);
        this.loadStats(); // Refresh stats
        this.hideAddLab();
      },
      error: (error) => {
        console.error('Error adding lab:', error);
      },
    });
  }

  handleAddPatient(patient: any) {
    this.patientService.addPatient(patient).subscribe({
      next: (newPatient) => {
        console.log('Patient added successfully:', newPatient);
        this.loadStats(); // Refresh stats
        this.hideAddPatient();
      },
      error: (error) => {
        console.error('Error adding patient:', error);
      },
    });
  }
}
