import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaqComponent } from '../faq/faq.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-landing-page',
  imports: [FaqComponent, NavbarComponent, HeroComponent, AboutComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {}
