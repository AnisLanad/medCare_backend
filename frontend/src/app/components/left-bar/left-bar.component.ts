import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="w-[250px] h-screen bg-white shadow-lg flex flex-col fixed left-0 top-0">
      <!-- Logo -->
      <div class="p-4 border-b">
        <img src="/images/logo.svg" alt="Logo" class="h-12 object-cover" />
      </div>

      <!-- Navigation Items -->
      <nav class="flex-1 pt-4">
        <!-- home -->
        <a
          routerLink="/admin/home"
          routerLinkActive="bg-blue-50 text-[#007BFF] border-l-4 border-[#007BFF]"
          class="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-100"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 9a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5l7 7-7 7"/>
          </svg>
          <span>Home</span>
        </a>
        <!-- Patient -->
        <a
          routerLink="/admin/patient"
          routerLinkActive="bg-blue-50 text-[#007BFF] border-l-4 border-[#007BFF]"
          class="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-100"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <span>Patient</span>
        </a>

        <!-- Doctor -->
        <a
          routerLink="/admin/doctor"
          routerLinkActive="bg-blue-50 text-[#007BFF] border-l-4 border-[#007BFF]"
          class="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-100"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <span>Doctor</span>
        </a>

        <!-- Lab -->
        <a
          routerLink="/admin/lab"
          routerLinkActive="bg-blue-50 text-[#007BFF] border-l-4 border-[#007BFF]"
          class="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-100"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
          </svg>
          <span>Lab</span>
        </a>

        <!-- Nurse -->
        <a
          routerLink="/admin/nurse"
          routerLinkActive="bg-blue-50 text-[#007BFF] border-l-4 border-[#007BFF]"
          class="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-100"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
          </svg>
          <span>Nurse</span>
        </a>
      </nav>
    </div>
  `
})
export class SidebarComponent {}
