import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'), // 懒加载组件
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/settings/index.vue'), // 让用户输入API地址
  },
  {
    path: '/',
    redirect: '/home', // 重定向到首页
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/layout/index.vue'), // 懒加载组件
    redirect: '/home/recommend', // 重定向到推荐页面
    children: [
      {
        path: 'recommend',
        name: 'Recommend',
        component: () => import('@/views/layout/recommend/index.vue'), // 懒加载组件
      },
      {
        path: 'musicBar',
        name: 'MusicBar',
        component: () => import('@/views/layout/musicBar/index.vue'), // 懒加载组件
        redirect: '/home/musicBar/selectedContent', // 重定向到精选页面
        children: [
          {
            path: 'artistCategory',
            name: 'ArtistCategory',
            component: () => import('@/views/layout/musicBar/artistCategory/index.vue'), // 懒加载组件
          },
          {
            path: 'audioContent',
            name: 'AudioContent',
            component: () => import('@/views/layout/musicBar/audioContent/index.vue'), // 懒加载组件
          },
          {
            path: 'digitalAlbum',
            name: 'DigitalAlbum',
            component: () => import('@/views/layout/musicBar/digitalAlbum/index.vue'), // 懒加载组件
          },
          {
            path: 'broadcastChannel',
            name: 'BroadcastChannel',
            component: () => import('@/views/layout/musicBar/broadcastChannel/index.vue'), // 懒加载组件
          },
          {
            path: 'rankingList',
            name: 'RankingList',
            component: () => import('@/views/layout/musicBar/rankingList/index.vue'), // 懒加载组件
          },
          {
            path: 'selectedContent',
            name: 'SelectedContent',
            component: () => import('@/views/layout/musicBar/selectedContent/index.vue'), // 懒加载组件
          },
          {
            path: 'songList',
            name: 'SongList',
            component: () => import('@/views/layout/musicBar/songList/index.vue'), // 懒加载组件
          }
        ]
      },
      {
        path: 'video',
        name: 'Video',
        component: () => import('@/views/layout/video/index.vue'), // 懒加载组件
      },
      {
        path: 'radioStation',
        name: 'RadioStation',
        component: () => import('@/views/layout/radioStaion/index.vue'), // 懒加载组件
      },
      {
        path: 'songlist/:id',
        name: 'Songlist',
        component: () => import('@/views/layout/Songlist/index.vue'), // 懒加载组件
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 如果目标路由不是设置页面，且没有配置 apiUrl，则跳转到设置页面
router.beforeEach((to, from, next) => {
  const apiUrl = sessionStorage.getItem('apiUrl')
  if (!apiUrl && to.path !== '/settings') {
    next({ path: '/settings' })
  } else {
    next()
  }
})

export default router