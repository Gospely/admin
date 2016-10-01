// show: meta.label -> name
// name: component name
// meta.label: display label

// lazy loading Components
// const Chartjs = resolve => require(['../views/charts/Chartjs.vue'], resolve)
// const Chartist = resolve => require(['../views/charts/Chartist.vue'], resolve)
// const Peity = resolve => require(['../views/charts/Peity.vue'], resolve)
// const Plotly = resolve => require(['../views/charts/Plotly.vue'], resolve)

export default [
  {
    name: '控制面板',
    path: '/dashboard',
    meta: {
      icon: 'fa-tachometer'
    },
    component: require('../views/dashboard')
  },
  {
    name: '数据统计',
    meta: {
      icon: 'fa-cubes',
      expanded: false
    },
    children: [
      {
        name: '订单统计',
        path: '/analytics/orders',
        meta: {
          label: '订单统计'
        },
        component: require('../views/tables/Basic') // Basic
      },
      {
        name: '用户统计',
        path: '/analytics/users',
        meta: {
          label: '用户统计'
        },
        component: require('../views/tables/Basic') // Basic
      },
      {
        name: '容器监控',
        path: '/analytics/dockers',
        meta: {
          label: '容器监控'
        },
        component: require('../views/tables/Basic') // Basic
      },
      {
        name: 'IDE监控',
        path: '/analytics/ide',
        meta: {
          label: 'IDE监控'
        },
        component: require('../views/tables/Basic') // Basic
      }
    ]
  },
  {
    name: '集成开发环境',
    meta: {
      icon: 'fa-desktop',
      expanded: false
    },
    children: [
      {
        name: '运行中IDE列表',
        path: '/ide/running',
        meta: {
          label: '运行中'
        },
        component: require('../views/ide/Running') // Basic
      },
      {
        name: '已停止IDE列表',
        path: '/ide/stopping',
        meta: {
          label: '已停止'
        },
        component: require('../views/ide/Stopping') // Basic
      },
      {
        name: '版本管理',
        path: '/ide/version',
        meta: {
          label: '版本管理'
        },
        component: require('../views/ide/Version') // Basic
      }
    ]
  },
  {
    name: '用户管理',
    meta: {
      icon: 'fa-users',
      expanded: false
    },
    children: [
      {
        name: '用户列表',
        path: '/users/commons',
        meta: {
          label: '用户列表'
        },
        component: require('../views/users/Commons') // Basic
      },
      {
        name: '企业列表',
        path: '/users/companys',
        meta: {
          label: '企业列表'
        },
        component: require('../views/users/Companys') // Basic
      },
      {
        name: '企业认证',
        path: '/users/company/verify',
        meta: {
          label: '企业认证'
        },
        component: require('../views/users/Verify') // Basic
      },
      {
        name: '组织管理',
        path: '/users/teams',
        meta: {
          label: '组织管理'
        },
        component: require('../views/users/Teams') // Basic
      }
    ]
  },
  {
    name: '容器管理',
    meta: {
      icon: 'fa-ship',
      expanded: false
    },
    children: [
      {
        name: '运行中容器',
        path: '/docker/starting',
        meta: {
          label: '运行中'
        },
        component: require('../views/docker/Running') // Basic
      },
      {
        name: '已停止容器',
        path: '/docker/stopping',
        meta: {
          label: '已停止'
        },
        component: require('../views/docker/Stopping') // Basic
      },
      {
        name: '容器配置列表',
        path: '/docker/configer',
        meta: {
          label: '容器配置'
        },
        component: require('../views/docker/Config') // Basic
      },
      {
        name: '容器镜像列表',
        path: '/docker/images',
        meta: {
          label: '容器镜像'
        },
        component: require('../views/docker/VolumesList') // Basic
      },
      {
        name: '数据卷配置',
        path: '/docker/configs/volumes',
        meta: {
          label: '数据卷配置'
        },
        component: require('../views/docker/VolumesConfig') // Basic
      }
    ]
  },
  {
    name: '订单管理',
    meta: {
      icon: 'fa-list-ul',
      expanded: false
    },
    children: [
      {
        name: '已完成订单',
        path: '/orders/done',
        meta: {
          label: '已完成'
        },
        component: require('../views/orders/Done') // Basic
      },
      {
        name: '未支付订单',
        path: '/orders/unpay',
        meta: {
          label: '未支付'
        },
        component: require('../views/orders/Unpay') // Basic
      },
      {
        name: '已取消订单',
        path: '/orders/canceled',
        meta: {
          label: '已取消'
        },
        component: require('../views/orders/Canceled') // Basic
      },
      {
        name: '已失败订单',
        path: '/orders/failed',
        meta: {
          label: '已失败'
        },
        component: require('../views/orders/Failed') // Basic
      }
    ]
  },
  {
    name: '套餐管理',
    meta: {
      icon: 'fa-diamond',
      expanded: false
    },
    children: [
      {
        name: '已完成订单',
        path: '/seriesorders/done',
        meta: {
          label: '已完成'
        },
        component: require('../views/package/Done') // Basic
      },
      {
        name: '未支付订单',
        path: '/seriesorders/unpay',
        meta: {
          label: '未支付'
        },
        component: require('../views/package/Unpay') // Basic
      },
      {
        name: '已取消订单',
        path: '/seriesorders/canceled',
        meta: {
          label: '已取消'
        },
        component: require('../views/package/Cancled') // Basic
      },
      {
        name: '已失败订单',
        path: '/seriesorders/failed',
        meta: {
          label: '已失败'
        },
        component: require('../views/package/Failed') // Basic
      }
    ]
  },
  {
    name: '权限管理',
    meta: {
      icon: 'fa-bell',
      expanded: false
    },
    children: [
      {
        name: '用户组管理',
        path: '/rights/groups',
        meta: {
          label: '用户组管理'
        },
        component: require('../views/privileges/Groups') // Basic
      },
      {
        name: '权限列表',
        path: '/rights/list',
        meta: {
          label: '权限列表'
        },
        component: require('../views/privileges/Privileges') // Basic
      },
      {
        name: '操作日志',
        path: '/rights/logs',
        meta: {
          label: '操作日志'
        },
        component: require('../views/privileges/Logs') // Basic
      },
      {
        name: '管理员列表',
        path: '/rights/display/admin',
        meta: {
          label: '管理员列表'
        },
        component: require('../views/privileges/Admin') // Basic
      }

    ]
  },
  {
    name: '系统消息',
    meta: {
      icon: 'fa-send',
      expanded: false
    },
    children: [
      {
        name: '发送消息',
        path: '/messages/send',
        meta: {
          label: '发送消息'
        },
        component: require('../views/system/Sending') // Basic
      },
      {
        name: '已发送消息',
        path: '/messages/sent',
        meta: {
          label: '已发送'
        },
        component: require('../views/system/Sent') // Basic
      }
    ]
  },
  {
    name: '系统设置',
    meta: {
      icon: 'fa-certificate',
      expanded: false
    },
    children: [
      {
        name: '修改密码',
        path: '/settings/passsword',
        meta: {
          label: '修改密码'
        },
        component: require('../views/system/ChangePassword') // Basic
      },
    ]
  },
  {
    name: '图表',
    path: '/charts',
    meta: {
      icon: 'fa-bar-chart-o',
      expanded: false
    },
    component: require('../views/charts'),

    children: [
      {
        name: 'Chartist',
        path: 'chartist',
        component: require('../views/charts/Chartist') // Chartist
      },
      {
        name: 'Chartjs',
        path: 'chartjs',
        component: require('../views/charts/Chartjs') // Chartjs
      },
      {
        name: 'Peity',
        path: 'peity',
        component: require('../views/charts/Peity') // Peity
      },
      {
        name: 'Plotly',
        path: 'plotly',
        component: require('../views/charts/Plotly') // Plotly
      }
    ]
  },
  {
    meta: {
      label: 'UI特性',
      icon: 'fa-laptop',
      expanded: false,
    },

    children: [
      {
        name: 'Buttons',
        path: '/buttons',
        component: require('../views/ui/Buttons') // Buttons
      },
      {
        name: 'Form',
        path: '/form',
        component: require('../views/ui/Form') // Form
      },
      {
        name: 'Typography',
        path: '/typography',
        component: require('../views/ui/Typography') // Typography
      },
      {
        name: 'Icons',
        path: '/icons',
        component: require('../views/ui/Icons') // Icons
      }
    ]
  },
  {
    name: '组件',
    path: '/components',
    meta: {
      icon: 'fa-building-o',
      expanded: false
    },
    component: require('../views/components'),

    children: [
      {
        path: '',
        component: require('../views/components/Default')
      },
      {
        name: 'BackToTop',
        path: 'backToTop',
        meta: {
          description: 'Jump component is based on jump.js',
          repository: 'https://github.com/vue-bulma/jump'
        },
        component: require('../views/components/BackToTop') // BackToTop
      },
      {
        name: 'Collapse',
        path: 'collapse',
        meta: {
          description: 'Collapse component',
          repository: 'https://github.com/vue-bulma/collapse'
        },
        component: require('../views/components/Collapse') // Collapse
      },
      {
        name: 'Datepicker',
        path: 'datepicker',
        meta: {
          description: 'Datepicker component is based on flatpickr',
          repository: 'https://github.com/vue-bulma/datepicker'
        },
        component: require('../views/components/Datepicker') // Datepicker
      },
      {
        name: 'Emoji',
        path: 'emoji',
        meta: {
          description: 'Emoji Component is based on emojione.com',
          repository: 'https://github.com/vue-bulma/emoji'
        },
        component: require('../views/components/Emoji') // Emoji
      },
      {
        name: 'Message',
        path: 'message',
        meta: {
          description: 'Message component',
          repository: 'https://github.com/vue-bulma/message'
        },
        component: require('../views/components/Message') // Message
      },
      {
        name: 'Modal',
        path: 'modal',
        meta: {
          description: 'Modal component',
          repository: 'https://github.com/vue-bulma/modal'
        },
        component: require('../views/components/Modal') // Modal
      },
      {
        name: 'Notification',
        path: 'notification',
        meta: {
          description: 'Notification component',
          repository: 'https://github.com/vue-bulma/notification'
        },
        component: require('../views/components/Notification') // Notification
      },
      {
        name: 'ProgressBar',
        path: 'progress-bar',
        meta: {
          description: 'ProgressBar component',
          repository: 'https://github.com/vue-bulma/progress-bar'
        },
        component: require('../views/components/ProgressBar') // ProgressBar
      },
      {
        name: 'ProgressTracker',
        path: 'progress-tracker',
        meta: {
          description: 'ProgressTracker component is based on progress-tracker',
          repository: 'https://github.com/vue-bulma/progress-tracker'
        },
        component: require('../views/components/ProgressTracker') // ProgressTracker
      },
      {
        name: 'Rating',
        path: 'rating',
        meta: {
          description: 'Rating component is based on starability.css',
          repository: 'https://github.com/vue-bulma/rating'
        },
        component: require('../views/components/Rating') // Rating
      },
      {
        name: 'Slider',
        path: 'slider'
      },
      {
        name: 'Switch',
        path: 'switch'
      },
      {
        name: 'Tabs',
        path: 'tabs'
      },
      {
        name: 'Tooltip',
        path: 'tooltip'
      }
    ]
  },
  {
    name: '表格',
    meta: {
      icon: 'fa-table',
      expanded: false
    },

    children: [
      {
        name: 'BasicTables',
        path: '/tables/basic',
        meta: {
          label: 'Basic Tables'
        },
        component: require('../views/tables/Basic') // Basic
      },
      {
        name: 'Handsontable',
        path: '/tables/handsontable',
        component: require('../views/tables/Handsontable') // Handsontable
      }
    ]
  }
]
