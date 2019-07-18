import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/tabbar-layout'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        },
        {
          name: 'my',
          path: '/my',
          component: () => import('@/views/my')
        }
      ]
    },
    {
      name: 'login',
      // 任何路径的匹配都不包括 ?xxxx 内容
      // router.query 获取查询字符串(？key=value&key=value....)参数
      // router.params 获取动态路径（:xxx）参数
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      name: 'search',
      path: '/search',
      component: () => import('@/views/search')
    },
    {
      name: 'search-result',
      path: '/search/:q',
      component: () => import('@/views/search-result')
    },
    {
      name: 'article',
      path: '/article/:articleId',
      component: () => import('@/views/article')
    },
    {
      name: 'test',
      path: '/test',
      component: () => import('@/views/test')
    }
  ]
})
