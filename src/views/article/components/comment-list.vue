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
        :key="item.com_id.toString()"
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
            <span @click="handleShowReply(item)">回复 {{ item.reply_count }}</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import globalBus from '@/utils/global-bus'

export default {
  name: 'CommentList',
  props: {
    /**
     * source 是文章id或是评论id
     * 文章id用于获取文章的评论
     * 评论id用于获取评论的回复
     */
    source: {
      type: [Number, String],
      required: true
    },

    /**
     * 你是要加载文章的评论呢？还是要加载评论的回复
     */
    isArticle: {
      type: Boolean,
      default: true
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

  created () {
  },

  methods: {
    async onLoad () {
      console.log('oLoad')
      const data = await getComments({
        source: this.source,
        offset: this.offset,
        limit: 10, // 默认为 10
        isArticle: this.isArticle
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
    },

    handleShowReply (item) {
      globalBus.$emit('reply-show', item)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
