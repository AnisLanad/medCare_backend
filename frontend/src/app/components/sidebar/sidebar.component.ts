import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Link } from '../../types/link.type';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isOpen = signal(false);

  @Input() links: Link[] = [];
  constructor(private router: Router) {}
  toggleIsOpen() {
    this.isOpen.set(!this.isOpen());
  }
  isActive(link: Link) {
    return this.router.isActive(link.path, true);
  }
  trackByLink(index: number, link: Link) {
    return link.path;
  }
}
