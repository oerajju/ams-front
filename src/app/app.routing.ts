import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, LoginGuard } from './modules/auth/auth.guard';
import { LoginComponent } from './modules/auth/login.component';

// Import Containers

import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'components',
        loadChildren: './views/components/components.module#ComponentsModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  },
  {
    path: 'contact',
    component: FullLayoutComponent,
    data: {
      title: 'Contact'
    },
    children: [
      {
        path: '',
        loadChildren: './modules/contact/contact.module#ContactModule',
      }
    ]
  },
  {
    path: 'one',
    component: FullLayoutComponent,
    data: {
      title: 'One'
    },
    children: [
      {
        path: '',
        loadChildren: './modules/one/one.module#OneModule',
      }
    ]
  },
  {
    path: 'org',
    component: FullLayoutComponent,
    data: {
      title: 'Organization'
    },
    children: [
      {
        path: '',
        loadChildren: './modules/org/org.module#OrgModule',
      }
    ]
  },
  {
    path: 'profile',
    component: FullLayoutComponent,
    data: {
      title: 'Profile'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './modules/profile/profile.module#ProfileModule',
      }
    ]
  },
  {
    path: 'employer',
    component: FullLayoutComponent,
    data: {
      title: 'Employer'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './modules/employer/employer.module#EmployerModule',
      }
    ]
  },
  {
    path: 'security',
    component: FullLayoutComponent,
    data: {
      title: 'Security Administration'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './modules/security/security.module#SecurityModule',
      }
    ]
  },
  {
    path: 'organization',
    component: FullLayoutComponent,
    data: {
      title: 'Organization Administration'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './modules/organization/organization.module#OrganizationModule',
      }
    ]
  },
  {
    path: 'machine',
    component: FullLayoutComponent,
    data: {
      title: 'Machine Administration'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './modules/machine/machine.module#MachineModule',
      }
    ]
  },
   {
    path: 'leave',
    component: FullLayoutComponent,
    data: {
      title: 'Employee Leave'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './modules/leave/leave.module#LeaveModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
