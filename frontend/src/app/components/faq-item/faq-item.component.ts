import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-faq-item',
  imports: [CommonModule],
  templateUrl: './faq-item.component.html',
  styleUrl: './faq-item.component.css',
})
export class FaqItemComponent {
  @Input() question: string = '';
  @Input() answer: string = '';
  isOpen = signal(false);
  toggleIsOpen() {
    this.isOpen.set(!this.isOpen());
  }
}
