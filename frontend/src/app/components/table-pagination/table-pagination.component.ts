import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  imports: [],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.css',
})
export class TablePaginationComponent {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();
  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
  get hasLastPage(): boolean {
    return this.currentPage < this.totalPages;
  }
  onPreviousPage() {
    if (this.hasPreviousPage) {
      this.pageChanged.emit(this.currentPage - 1);
    }
  }
  onNextPage() {
    if (this.hasLastPage) {
      this.pageChanged.emit(this.currentPage + 1);
    }
  }
}
