import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: `<ng-progress></ng-progress><ng2-toasty [position]="'top-right'"></ng2-toasty><router-outlet></router-outlet>`,
})
export class AppComponent {}
