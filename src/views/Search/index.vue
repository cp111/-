<template>
  <div>
    <!---------------- 搜索框 ---------------------->
    <form action="/">
      <!-- 聚焦事件，聚焦的时候搜索结果组件改为false，然后会在剩下的两个组件条件里面寻找 -->
      <van-search
        @cancel="$router.push('/')"
        @focus="isShowSearchResult = false"
        @search="onSearch"
        class="search"
        v-model.trim="keywords"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
      />
      <!-- -----------------搜索历史/建议/结果------------ -->
      <!-- <SearchSuggestion></SearchSuggestion>
      <SearchHistory></SearchHistory>
      <SearchResult></SearchResult> -->
    </form>
    <!-- 动态组件 , is属性后面显示哪个组件名，就显示哪个组件-->
    <component
      @change-keywords="onSearch"
      :keywords="keywords"
      :is="componentName"
    ></component>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import SearchSuggestion from './components/SearchSuggestion'
import SearchHistory from './components/SearchHistory'
import SearchResult from './components/SearchResult'
export default {
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 去重：1.获取没有去重的数组  2.new Set(arr)  3. [...set]
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
