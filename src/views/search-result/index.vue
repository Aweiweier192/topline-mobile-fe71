<template>
  <div>
    <!-- 导航头部 -->
    <van-nav-bar
      title="搜索结果"
      left-text="返回"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <!-- /导航头部 -->

    <!-- 文章列表 -->
    <van-list
      class="article-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in articles"
        :key="item.art_id.toString()"
        :title="item.title"
      />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getSearch } from '@/api/search'

export default {
  name: 'SearchResult',
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },

  computed: {
    q () {
      return this.$route.params.q
    }
  },

  methods: {
    async onLoad () {
      await this.$sleep(800)
      const data = await getSearch({
        page: this.page,
        perPage: this.perPage,
        q: this.q
      })

      // 如果没有数据了
      if (!data.results.length) {
        // 取消 loading
        this.loading = false

        // 设置数据已加载结束
        this.finished = true

        return
      }

      // 如果有数据，将数据 push 到数组中加载更多
      this.articles.push(...data.results)

      // 更新下一次加载更多的页码
      this.page += 1

      // 本地数据加载完毕，关闭 loading（它每次 onLoad 的时候会自动将 loading 设置为 true）
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  margin-top: 92px;
}
</style>
