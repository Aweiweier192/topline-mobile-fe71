<template>
  <div class="more-action">
    <van-button
      :icon="isLike ? 'like' : 'like-o'"
      round
      :loading="false"
      @click="handleLike"
    >{{ isLike ? '取消' : '' }}点赞</van-button>

    <van-button
      icon="delete"
      round
      :loading="false"
      type="danger"
    >不喜欢</van-button>
  </div>
</template>

<script>
export default {
  name: 'MoreAction',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {}
  },

  computed: {
    isLike () {
      return this.article.attitude === 1
    }
  },

  methods: {
    handleLike () {
      // if (已赞) {
      //   // 取消点赞
      // } else {
      //   // 点赞
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
