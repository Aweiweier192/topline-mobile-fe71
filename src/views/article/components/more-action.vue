<template>
  <div class="more-action">
    <van-button
      :icon="isLike ? 'like' : 'like-o'"
      round
      :loading="isLikeLoading"
      @click="handleLike"
    >{{ isLike ? '取消' : '' }}点赞</van-button>

    <van-button
      :icon="isDislike ? 'delete' : 'bag'"
      round
      :loading="isDislikeLoading"
      @click="handleDislike"
    >{{ isDislike ? '取消' : '' }}不喜欢</van-button>
  </div>
</template>

<script>
import {
  likeArticle,
  unLikeArticle,
  dislikeArticle,
  unDislikeArticle
} from '@/api/article'

export default {
  name: 'MoreAction',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      isLikeLoading: false,
      isDislikeLoading: false
    }
  },

  computed: {
    isLike () {
      return this.article.attitude === 1
    },
    isDislike () {
      return this.article.attitude === 0
    }
  },

  methods: {
    async handleLike () {
      if (!this.$checkLogin()) {
        return
      }
      try {
        this.isLikeLoading = true
        const articleId = this.article.art_id
        if (this.isLike) {
          // 取消点赞
          await unLikeArticle(articleId)
          this.article.attitude = -1
        } else {
          // 点赞
          await likeArticle(articleId)
          this.article.attitude = 1
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.isLikeLoading = false
    },

    async handleDislike () {
      if (!this.$checkLogin()) {
        return
      }

      try {
        this.isDislikeLoading = true
        const articleId = this.article.art_id
        if (this.isDislike) {
          // 取消不喜欢
          await unDislikeArticle(articleId)
          this.article.attitude = -1
        } else {
          // 不喜欢
          await dislikeArticle(articleId)
          this.article.attitude = 0
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.isDislikeLoading = false
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
