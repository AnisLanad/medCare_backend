import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  animations: [
    trigger('fadeSlideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('float', [
      state('void', style({ transform: 'translateY(0)' })),
      state('*', style({ transform: 'translateY(0)' })),
      transition('* <=> *', [
        animate('3s ease-in-out', style({ transform: 'translateY(-20px)' })),
        animate('3s ease-in-out', style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class NotFoundComponent implements OnInit {
  isHovering = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startCompassAnimation();
  }

  getBlobColor(index: number): string {
    const colors = [
      'bg-blue-200',
      'bg-blue-300',
      'bg-blue-400',
      'bg-blue-300',
      'bg-blue-200',
      'bg-blue-100',
    ];
    return colors[index - 1] || colors[0];
  }

  startCompassAnimation(): void {
    setInterval(() => {
      this.isHovering = !this.isHovering;
    }, 15000);
  }

  goBack(): void {
    window.history.back();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
