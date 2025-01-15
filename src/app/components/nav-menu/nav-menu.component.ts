import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <aside [class]="isCollapsed ? 'w-20' : 'w-64'" class="fixed left-0 top-0 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out z-10">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 [class]="isCollapsed ? 'hidden' : 'text-xl font-bold'">CRM System</h1>
        <button (click)="toggleSidebar()" class="p-2 rounded-lg hover:bg-gray-700 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="mt-6">
        <a routerLink="/logistics" 
           routerLinkActive="bg-blue-600"
           class="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
          </svg>
          <span [class]="isCollapsed ? 'hidden' : 'ml-3'">Logistics</span>
        </a>
        
        <a routerLink="/employees" 
           routerLinkActive="bg-blue-600"
           class="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span [class]="isCollapsed ? 'hidden' : 'ml-3'">Employees</span>
        </a>
        
        <a routerLink="/bills" 
           routerLinkActive="bg-blue-600"
           class="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span [class]="isCollapsed ? 'hidden' : 'ml-3'">Bills</span>
        </a>
        
        <a routerLink="/accountability" 
           routerLinkActive="bg-blue-600"
           class="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span [class]="isCollapsed ? 'hidden' : 'ml-3'">Accountability</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    a.active {
      @apply bg-blue-600;
    }
    
    .router-link-active {
      @apply bg-blue-600;
    }
  `]
})
export class NavMenuComponent {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}