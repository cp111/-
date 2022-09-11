<template>
  <div>
    <ArticleItem :article='item' v-for="item in getArticlesList" :key="item.art_id"></ArticleItem>
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
      getArticlesList: []
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    async getArticles() {
      try {
        const { data } = await getArticlesAPI(this.id, +new Date())
        console.log(data)
        this.getArticlesList = data.data.results
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
    }
  }
}
</script>

<style></style>
