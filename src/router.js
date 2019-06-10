import Vue from 'vue';
import Router from 'vue-router';
import session from '@/utils/storage';

Vue.use(Router);

// menu代码是否在菜单中显示
// noAuth代表当前路由不需要权限即可访问
// exclude代表不需要keep-alive的路由
let [menu, exclude, noAuth] = [true, true, true];

const routes = [
  {
    path: '/',
    redirect: '/chartDevice',
    component: () => import('@/components/layout'),
    children: [
      {
        path: '/chartDevice',
        name: 'chartDevice',
        meta: { exclude, title: '设备汇总', parent: { name: 'DashboardData', title: '数据汇总', icon: 'iconfont icon-gather' } },
        component: () => import('@/pages/dashboard/chartDevice')
      },
      {
        path: '/mapCar',
        name: 'mapCar',
        meta: { menu, title: '实时车辆', icon: 'iconfont icon-gps' },
        component: () => import('@/pages/mapCar')
      },
      {
        path: '/mapHot',
        name: 'mapHot',
        meta: { menu, title: '热力地图', icon: 'iconfont icon-hotMap' },
        component: () => import('@/pages/mapHot')
      },
      {
        path: '/listMember',
        name: 'listMember',
        meta: { menu, title: '管理员列表', icon: 'iconfont icon-admin' },
        component: () => import('@/pages/listMember')
      },
      {
        path: '/listRole',
        name: 'listRole',
        meta: { menu, title: '角色列表', icon: 'iconfont icon-auth' },
        component: () => import('@/pages/listRole')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { noAuth },
    component: () => import('@/pages/login')
  },
  {
    path: '*',
    name: 'notFound',
    meta: { noAuth },
    component: () => import('@/pages/notFound')
  }
];

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  // 此处做权限拦截
  if (!to.meta.noAuth && !session.get('isLogin', 0)) {
    return next({ name: 'login' });
  }
  next();
});

export const aMenu = [];

// 菜单过滤
routes[0].children.map(item => {
  if (item.meta.menu) {
    aMenu.push({
      index: item.name,
      icon: item.meta.icon,
      title: item.meta.title
    });
  }

  if (item.meta.parent) {
    let obj = aMenu.find(obj => obj.index === item.meta.parent.name);
    let _item = { index: item.name, title: item.meta.title };

    if (obj) {
      obj.children.push(_item);
    } else {
      aMenu.push({
        index: item.meta.parent.name,
        icon: item.meta.parent.icon,
        title: item.meta.parent.title,
        children: [_item]
      });
    }
  }
});

export default router;
