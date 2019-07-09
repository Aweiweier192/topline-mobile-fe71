<template>
  <div class="login-wrap">
    <van-nav-bar title="标题"/>
    <form>
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          required
          clearable
          label="手机号"
          placeholder="请输入手机号"
          :error-message="mobileMessage"
        />

        <van-field
          v-model="user.code"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
      </van-cell-group>
      <div class="login-btn">
        <van-button class="btn" type="info" @click.prevent="handleLogin">登录</van-button>
      </div>
    </form>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '123456'
      },
      mobileMessage: ''
    }
  },

  methods: {
    async handleLogin () {
      if (this.user.mobile.trim().length) {
        this.mobileMessage = ''
      } else {
        this.mobileMessage = '请输入手机号'
        return
      }

      try {
        const data = await login(this.user)

        // 通过提交 mutation 更新 Vuex 容器中的装填
        this.$store.commit('setUser', data)
      } catch (err) {
        console.log(err)
        console.log('登录失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  padding: 10px;
  .btn {
    width: 100%;
  }
}
</style>
