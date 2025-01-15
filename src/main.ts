import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from './app/components/nav-menu/nav-menu.component';
import { appConfig } from './app/app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuComponent],
  template: `
    <div class="min-h-screen bg-gray-100 flex">
      <app-nav-menu></app-nav-menu>
      <main class="flex-1 ml-64 p-8 transition-all duration-300">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class App {}

bootstrapApplication(App, appConfig);