<template>
  <div>
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '75%' }"
    >
      <van-nav-bar
        :title="`${comment.reply_count}条回复`"
        @click-left="isShow = false"
      >
        <van-icon slot="left" name="cross"></van-icon>
      </van-nav-bar>
      <van-cell>
        <div slot="icon">
          <img class="avatar" :src="comment.aut_photo" alt="">
        </div>
        <div slot="title" style="display: flex; align-items: center;">
          <span>{{ comment.aut_name }}</span>
          <van-tag>楼主</van-tag>
        </div>
        <div slot="label">
          <p>{{ comment.content }}</p>
          <p>
            <span>{{ comment.pubdate | relativeTime }}</span>
          </p>
        </div>
      </van-cell>

      <!-- 回复的评论列表 -->
      <comment-list
        v-if="isShow"
        :source="comment.com_id.toString()"
        :is-article="false"
      />
      <!-- /回复的评论列表 -->
    </van-popup>

    <!-- 对回复添加评论 -->
    <add-comment
      class="add-comment"
      v-if="isShow"
      :target="comment.com_id.toString()"
      :article-id="articleId"
    />
    <!-- /对回复添加评论 -->
  </div>
</template>

<script>
import globalBus from '@/utils/global-bus'
import CommentList from './comment-list'
import AddComment from './add-comment'

export default {
  name: 'ReplyList',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    articleId: {
      type: [Number, String],
      required: true
    }
  },

  components: {
    CommentList,
    AddComment
  },

  data () {
    return {
      isShow: false,
      comment: {}
    }
  },

  created () {
    // 使用 globalBus 监听一个自定义事件
    // 注：comment-list 组件中点击 “回复” 按钮会触发该事件
    globalBus.$on('reply-show', (item) => {
      this.isShow = true
      this.comment = item
    })
  }
}
</script>

<style lang="less" scoped>
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
}
</style>
