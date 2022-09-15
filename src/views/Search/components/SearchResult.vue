<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
      @click="$router.push({
        path: '/detail',
        query: {articleId: item.art_id}
      })"
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api/search'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      error: false,
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false
    }
  },
  methods: {
    async getResults() {
      // 加载下一页的时候page++
      try {
        const { data } = await getResultsAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        // console.log(data)
        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        // 保存数据
        // this.results.push(...data.data.results)
        this.results = [...this.results, ...results]
      } catch (error) {
        this.error = true
      } finally {
        // 失败与否，加载完后更改loading状态
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
