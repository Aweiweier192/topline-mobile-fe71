<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in comments"
        :key="item.com_id"
      >
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt="">
        </div>
        <div slot="title">
          <span>{{ item.aut_name }}</span>
        </div>
        <div slot="default">
          <van-button :icon="item.is_liking ? 'like' : 'like-o'" size="mini" plain>赞</van-button>
        </div>
        <div slot="label">
          <p>{{ item.content }}</p>
          <p>
            <span>{{ item.pubdate | relativeTime }}</span>
            ·
            <span>回复 {{ item.reply_count }}</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getArticleComments } from '@/api/comment'

export default {
  name: 'CommentList',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      comments: [],
      loading: false,
      finished: false,
      offset: null
    }
  },

  computed: {
    articleId () {
      return this.$route.params.articleId
    }
  },

  created () {
  },

  methods: {
    async onLoad () {
      console.log('oLoad')
      const data = await getArticleComments({
        articleId: this.articleId,
        offset: this.offset,
        limit: 10 // 默认为 10
      })

      // 如果没有数据，则意味着评论加载完毕了
      if (!data.results.length) {
        this.finished = true
        this.loading = false
        return
      }

      // 有数据，将数据添加到评论列表中
      this.comments.push(...data.results)

      // 将本次的 loading 设置为 false
      this.loading = false

      // 提供下一页的请求参数
      this.offset = data.last_id
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>
