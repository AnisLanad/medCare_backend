import { Component } from '@angular/core';
import {SidebarComponent} from '@app/components/left-bar/left-bar.component';
import {DashboardHeaderComponent} from '@app/components/Header-dashboard/header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    SidebarComponent,
    DashboardHeaderComponent,
    RouterOutlet
  ],
  template: `
    <div class="flex min-h-screen bg-gray-50">
      <!--   Sidebar -->
      <app-sidebar></app-sidebar>
      <!--   Main Content -->
      <div class="flex-1 ml-[250px]">
        <!-- Header -->
        <app-dashboard-header></app-dashboard-header>
        <!---->
        <!-- Page Content -->
       <router-outlet></router-outlet>
      </div>
    </div>

  `
})
export class AdminDashboardComponent {}
