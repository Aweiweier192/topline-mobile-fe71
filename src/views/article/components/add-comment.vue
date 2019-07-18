<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input type="text" v-model="content">
    </div>
    <div class="more-wrap">
      <van-icon
        v-if="!articleId"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="handleCollect"
      ></van-icon>
      <van-button
        size="small"
        :disabled="!content.length"
        @click="handleAdd"
      >发布</van-button>
    </div>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
import { collectArticle, unCollectArticle } from '@/api/article'

export default {
  name: 'AddComment',
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    articleId: {
      type: [Number, String],
      default: null
    },
    article: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      content: ''
    }
  },

  methods: {
    async handleAdd () {
      try {
        await addComment({
          target: this.target, // 文章id | 评论id
          content: this.content,
          articleId: this.articleId
        })
        this.$toast('发布成功')
        this.content = ''
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },

    async handleCollect () {
      try {
        const articleId = this.article.art_id
        if (this.article.is_collected) {
          // 取消收藏
          await unCollectArticle(articleId)
          this.article.is_collected = false
        } else {
          // 收藏
          await collectArticle(articleId)
          this.article.is_collected = true
        }
        this.$toast('收藏成功')
      } catch (err) {
        this.$toast.fail('收藏失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-comment {
  width: 100%;
  background: #fff;
  padding: 20px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 30px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
