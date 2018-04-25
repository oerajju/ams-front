import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'page-helper',
  template: `<form class="form-inline">
                        <label class="mr-sm-2" for="">Show</label>
                        <select id="page-helper-selection" class="custom-select mb-2 mr-sm-2 mb-sm-0" (change)="changePerPage($event)">
                          <option *ngFor="let item of getPerPages()" [ngValue]="item"  [selected]="item == currentPerPage">{{item}}</option>
                        </select>
                        <label class="mr-sm-2" for=""> items per page.</label>
                    </form>
                    <p class="strong">Showing {{currentMin()}}-{{currentMax()}} of total {{totalItems}} items.</p>`
})
export class PageHelper {
  @Input() totalItems: number;
  @Input() currentPage: number;
  @Input() perPage: number;
  @Input() pagesToShow?;
  currentPerPage;
  
  @Output() update = new EventEmitter();
  
  constructor() { }
  
  getPerPages (): number[]{
      let pts;
      if(this.pagesToShow=='undefined' || this.pagesToShow==''){
          pts =  [10,20,50,100];
      }else{
          pts =  this.pagesToShow;
      }
      this.currentPerPage = pts[0];
      return pts;
  }
  
  currentMin (){
      if(this.currentPage==1){
          return 1;
      }
      return (this.currentPage-1)*this.perPage;
  }
  currentMax (){
      let maxItems = this.perPage * this.currentPage;
      if(this.totalItems <= maxItems){
          return this.totalItems;
      }else{
          return maxItems;
      }
  }
  getSelectedPage (page?){
      if(page == 'undefined'){
          return this.getPerPages()[0];
      }
      return page;
  }
  
  changePerPage(event){
      return this.update.emit(event.target.value);
  }
}


