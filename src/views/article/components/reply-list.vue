<template>
  <div>
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '75%' }"
    >
      <van-cell>
        <div slot="icon">
          <img class="avatar" :src="comment.aut_photo" alt="">
        </div>
        <div slot="title">
          <span>{{ comment.aut_name }}<van-tag>楼主</van-tag></span>
        </div>
        <div slot="label">
          <p>{{ comment.content }}</p>
          <p>
            <span>{{ comment.pubdate | relativeTime }}</span>
          </p>
        </div>
      </van-cell>
    </van-popup>
  </div>
</template>

<script>
import globalBus from '@/utils/global-bus'

export default {
  name: 'ReplyList',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: false,
      comment: {}
    }
  },
  created () {
    // 使用 globalBus 监听一个自定义事件
    globalBus.$on('reply-show', (item) => {
      this.isShow = true
      this.comment = item
    })
  }
}
</script>

<style lang="less" scoped></style>
