// dashboard-header.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  template: `
    <div class="w-full bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Calendar and Date -->
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
            <span class="text-gray-800 text-lg font-medium">Monday, 8th december</span>
          </div>

          <!-- Right Side Icons and Profile -->
          <div class="flex items-center gap-12">
            <!-- Help Icon -->
            <button class="text-[#007BFF] hover:opacity-80">
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
              </svg>
            </button>

            <!-- Notification Icon -->
            <button class="text-[#007BFF] hover:opacity-80 relative">
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
              <span
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">1</span>
            </button>

            <!-- Admin Profile -->
            <div class="flex items-center gap-3">
              <span class="text-gray-800 font-medium">Admin</span>
              <img
                src="/Image.svg"
                alt="Admin profile"
                class="w-10 h-10 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardHeaderComponent {
  // Add any required methods here
}
