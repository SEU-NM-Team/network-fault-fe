import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    AuthKey: 'roleManage:find',      该页面进入的权限码
    keepAlive: true,                  该页面需要缓存(注意: name值必须设置 与组件内部name 一致 配合isback属性)
    isback :  false
  }
* AuthKey: 'roleManage:find'      该页面进入的权限码
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/index',
    userType: '',
    component: Layout,
    name: 'index',
    meta: {
      title: '首页',
      icon: 'iconhome2'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/home/index'),
        meta: {
          title: '首页',
          icon: 'iconhome2',
          keepAlive: true,

        }
      },
    ]
  },
  {
    path: '/access',
    name: 'access',
    component: Layout,
    userType: 'admin',
    meta: {
      title: '用户权限',
      icon: 'icondfzq-',
      requireAuth: true,
      permission: 'authorityManage|roleManage|userManage'
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/accessUser/index'),
        meta: {
          title: '用户管理',
          icon: 'iconyonghu',
          keepAlive: true,
          requireAuth: true,
          permission: 'userManage'
        }
      },
    ]
  },
  // {
  //   path: '/adminManagement',
  //   component: Layout,
  //   name: '用户管理',
  //   meta: {
  //     title: '用户管理',
  //     icon: 'iconyonghu'
  //   },
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/admin/adminManagement'),
  //       meta: {
  //         title: "用户管理",
  //         icon: 'iconyonghu',
  //         keepAlive: true,
  //         requireAuth: true,
  //       }
  //     }
  //   ]
  //   // hidden:true,
  // },
  {
    path: '/data',
    name: 'data',
    component: Layout,
    userType: 'admin',
    meta: {
      title: '数据管理',
      icon: 'iconnavicon-ywcs'
    },
    children: [
      {
        path: 'datasource',
        name: 'datasource',
        component: () => import('@/views/datasource/index'),
        meta: {
          title: '数据源',
          icon: 'icondatabase',
          keepAlive: true,
          requireAuth: true,
          permission: 'datasourceManage'
        }
      },
      {
        path: 'resultset',
        name: 'resultset',
        component: () => import('@/views/resultset/index'),
        meta: {
          title: '数据集',
          icon: 'iconAPIwangguan',
          keepAlive: true,
          requireAuth: true,
          permission: 'resultsetManage'
        }
      },
    ]
  },
  {
    path: '/report',
    name: 'report',
    component: Layout,
    userType: '',
    // meta: {
    //   title: '报表设计',
    //   icon: 'iconnavicon-ywcs',
    //   requireAuth: true,
    //   permission: 'datasourceManage|resultsetManage|reportManage|bigScreenManage'
    // },
    children: [
      {
        path: 'report',
        name: 'reportIndex',
        component: () => import('@/views/reportManage/index'),
        meta: {
          title: '数据展示',
          icon: 'iconchufaqipeizhi-hui',
          keepAlive: true,
          requireAuth: true,
          permission: 'reportManage'
        }
      },
      // {
      //   path: 'bigscreen',
      //   name: 'bigscreen',
      //   component: () => import('@/views/bigScreenReport/index'),
      //   meta: {
      //     title: '大屏报表',
      //     icon: 'iconchufaqipeizhi-hui',
      //     keepAlive: true,
      //     requireAuth: true,
      //     permission: 'bigScreenManage'
      //   },
      // },
    ]
  },
  // {
  //   path: '/bigscreen/viewer',
  //   component: () => import('@/views/bigscreenDesigner/viewer'),
  //   hidden: true,
  //   meta: {
  //     requireAuth: true
  //   }
  // },
  // {
  //   path: '/bigscreen/designer',
  //   component: () => import('@/views/bigscreenDesigner/designer'),
  //   hidden: true,
  //   meta: {
  //     requireAuth: true
  //   }
  // },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/screen/1',
    component: () => import('@/views/screen/screen1'),
    hidden: true,
    meta: {
      title: '数据大屏',
      requireAuth: true
    }
  },
  {
    path: '/screen/2',
    component: () => import('@/views/screen/screen2'),
    hidden: true,
    meta: {
      title: '数据大屏',
      requireAuth: true
    }
  },
  {
    path: '/screen/3',
    component: () => import('@/views/screen/screen3'),
    hidden: true,
    meta: {
      title: '数据大屏',
      requireAuth: true
    }
  },
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})