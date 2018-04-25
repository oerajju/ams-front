import { Component, Input } from '@angular/core';

@Component({
  selector: 'tt-pagination',
  template: `<nav>
            <ul class="pagination" *ngIf="totalItems > 0 ">
              <li class="page-item"  [ngClass]="{'disabled':currentPage == 1}"><a class="page-link" href="#">Prev</a></li>
              <li class="page-item" *ngFor = " let page of getPages()"
                [ngClass]="{'active': currentPage == page}"
               
                >
                <a class="page-link" href="#">{{page}}</a>
              </li>
              <li class="page-item" [ngClass]="{'disabled':lastPage()}"><a class="page-link" href="#">Next</a></li>
            </ul>
          </nav>`
})
export class Pagination {
  @Input() totalItems: number;
  @Input() currentPage: number;
  @Input() perPage: number;
  @Input() pagesToShow: number;
  constructor() { }
  
  getMin(): number {
      return ((this.perPage * this.currentPage) - this.perPage) + 1;
    }

  getMax(): number {
    let max = this.perPage * this.currentPage;
    if (max > this.totalItems) {
      max = this.totalItems;
    }
    return max;
  }
  
  getPages(): number[] {
        const c = Math.ceil(this.totalItems / this.perPage);
        const p = this.currentPage || 1;
        const pagesToShow = this.pagesToShow || 9;
        const pages: number[] = [];
        pages.push(p);
        const times = pagesToShow - 1;
        for (let i = 0; i < times; i++) {
          if (pages.length < pagesToShow) {
            if (Math.min.apply(null, pages) > 1) {
              pages.push(Math.min.apply(null, pages) - 1);
            }
          }
          if (pages.length < pagesToShow) {
            if (Math.max.apply(null, pages) < c) {
              pages.push(Math.max.apply(null, pages) + 1);
            }
          }
        }
        pages.sort((a, b) => a - b);
        return pages;
    }
    
    totalPages(): number {
        return Math.ceil(this.totalItems / this.perPage) || 0;
    }

    lastPage(): boolean {
        return this.perPage * this.currentPage > this.totalItems;
    }
}


