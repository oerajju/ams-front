export const navigation = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name:'Profile',
    url:'/profile',
    icon: 'icon-upload',
  },
  {
    title: true,
    name: 'Local Operations'
  },
  {
    name: 'Employer Setup',
    url: '/employer',
    icon: 'icon-light',
    children: [
      {
        name: 'Employer Type',
        url: '/employer/type',
        icon: 'icon-puzzle'
      },
      {
        name: 'Employer Size',
        url: '/employer/size',
        icon: 'icon-puzzle'
      },
      {
        name: 'Working Area/Category',
        url: '/employer/category',
        icon: 'icon-puzzle'
      },
      {
        name: 'Employer',
        url: '/employer',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Organization Setup',
    url: '/organization',
    icon: 'fa fa-building-o',
    children:[
        {
        name: 'Organization',
        url: '/organization/organization',
        icon: 'fa fa-institution'
      },
      {
        name: 'Posts',
        url: '/organization/post',
        icon: 'fa fa-certificate'
      },
      {
        name: 'Employee',
        url: '/organization/employee',
        icon: 'fa fa-users'
      }
    ]
  },
   {
    name: 'Security',
    url: '/security',
    icon: 'icon-user',
    children: [
      {
        name: 'Permissions',
        url: '/security/permission',
        icon: 'icon-eye'
      },
      {
        name: 'Roles',
        url: '/security/role',
        icon: 'icon-key'
      },
      {
        name: 'Users',
        url: '/security/users',
        icon: 'icon-user'
      }
    ]
  },
   {
    name: 'Machine Setup',
    url: '/machine',
    icon: 'fa fa-fax',
    children: [
      {
        name: 'Machines',
        url: '/machine/register',
        icon: 'fa fa-plus'
      },
      {
        name: 'Bind Organization',
        url: '/machine/bind-org',
        icon: 'fa fa-gear'
      },
      {
        name: 'Bind Employee',
        url: '/machine/bind-emp',
        icon: 'icon-user'
      }
    ]
  },
  {
    name: 'Leave',
    url: '/leave',
    icon: 'icon-user',
    children: [
      {
        name: 'Leave Request',
        url: '/leave/leave-request',
        icon: 'icon-eye'
      },
      {
        name: 'Leave Approval',
        url: '/leave/leave-approval',
        icon: 'icon-key'
      }
    ]
  }
];
