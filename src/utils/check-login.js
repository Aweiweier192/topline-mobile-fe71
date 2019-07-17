/**
 * 插件的作用：
 *  注册全局组件、自定义指令、过滤器、扩展原型对象成员。。。。都可以
 */
import store from '@/store'
import { Dialog } from 'vant'
import router from '@/router'

function checkLogin () {
  const { user } = store.state

  // 如果用户已登录
  if (user) {
    return true
  }

  // 没有登录，提示用户：“该操作需要登录，确认登录吗？”
  Dialog.confirm({
    title: '登录提示',
    message: '该操作需要登录，确认登录吗？'
  }).then(() => {
    router.push({
      name: 'login',
      query: {
        // 将当前路由的完整路径通过 url 传递给登录页面
        // 在非组件模块中获取当前路由使用 router.currentRoute
        // 它和你在组件中的 this.$route 是一个东西
        redirect: router.currentRoute.fullPath
      }
    })

    // 也可以这样写（等价于上面的写法）
    // router.push('/login?redirect=' + router.currentRoute.fullPath)
  }).catch(() => {
  })
}

export default {
  // 当你 Vue.use(这个插件对象) 的时候，install 方法会被自动调用
  install (Vue, options) {
    console.log('install 方法被调用了')
    Vue.prototype.$checkLogin = checkLogin
  }
}
