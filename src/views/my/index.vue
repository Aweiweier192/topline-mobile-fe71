<template>
  <div>
    <un-login v-if="!$store.state.user"/>
    <user-info v-else :user="user" />
    <app-tabbar/>
  </div>
</template>

<script>
import UnLogin from './components/un-login'
import UserInfo from './components/user-info'
import { getCurrentUserInfo } from '@/api/user'
import AppTabbar from '@/views/app-tabbar'

export default {
  name: 'MyIndex',
  components: {
    UnLogin,
    UserInfo,
    AppTabbar
  },

  data () {
    return {
      user: {}
    }
  },

  created () {
    console.log('created')
    if (this.$store.state.user) {
      this.loadUserInfo()
    }
  },

  deactivated () {
    console.log('deactivated')
    this.$destroy()
  },

  methods: {
    async loadUserInfo () {
      try {
        const data = await getCurrentUserInfo()
        this.user = data
      } catch (err) {
        this.$toast.fail('加载用户信息失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
