<template>
  <div class="article">
    <van-pull-refresh v-model="refreshing" @refresh="getNextPageArticle">
      <van-list
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="getNextPageArticle"
        offset="100"
        v-model="loading"
        :immediate-check="false"
      >
        <ArticleItem
          :article="item"
          v-for="item in getArticlesList"
          :key="item.art_id"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticlesAPI } from '@/api'
export default {
  props: {
    id: [String, Number]
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      refreshing: false,
      error: false,
      getArticlesList: [],
      preTimestamp: '',
      loading: false,
      finished: false
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    async getArticles() {
      try {
        const { data } = await getArticlesAPI(this.id, +new Date())
        // console.log(data)
        this.getArticlesList = data.data.results
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // js的错误，上抛507原封不动 400上抛中文
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },

    // 下拉刷新跟下滑加载是同一个函数，条件不同
    async getNextPageArticle() {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        const { data } = await getArticlesAPI(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshing) {
          // refreshing为true，追加到最前面
          this.getArticlesList.unshift(...data.data.results)
        } else {
          this.getArticlesList.push(...data.data.results)
        }
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // finally是不管try还是error，最后都要再执行finally里面的语句
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
}
// 如何给盒子拥有自己的滚动条
// - 1.定高 2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;

  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
