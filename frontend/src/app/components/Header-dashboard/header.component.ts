// dashboard-header.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Left Side: Calendar and Dynamic Date/Time -->
          <div class="flex items-center gap-6">
            <svg
              class="w-6 h-6 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke-width="2"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke-width="2"/>
            </svg>
            <div class="flex flex-col">
              <span class="text-gray-800 text-lg font-medium">{{ currentDate }}</span>
              <span class="text-gray-600 text-sm">{{ currentTime }}</span>
            </div>
          </div>

          <!-- Right Side: Admin Avatar -->
          <div class="flex items-center gap-4">
            <div class="relative group">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <svg
                  class="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="7" r="4" stroke-width="2"/>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-width="2"/>
                </svg>
              </div>
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              <!-- Tooltip on hover -->
              <div class="absolute -bottom-8 right-0 bg-gray-800 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Admin
              </div>
            </div>
            <span class="text-gray-800 font-medium hidden md:block">John Doe</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      nav a {
        transition: color 0.3s ease;
      }
    `
  ]
})
export class DashboardHeaderComponent implements OnInit {
  currentDate: string = '';
  currentTime: string = '';

  ngOnInit(): void {
    // Update the date and time immediately
    this.updateDateTime();

    // Update the date and time every second
    interval(1000).subscribe(() => {
      this.updateDateTime();
    });
  }

  updateDateTime(): void {
    const now = new Date();

    // Format the date (e.g., "Monday, 8th December")
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    this.currentDate = now.toLocaleDateString('en-US', options);

    // Format the time (e.g., "10:45 AM")
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    this.currentTime = now.toLocaleTimeString('en-US', timeOptions);
  }
}
