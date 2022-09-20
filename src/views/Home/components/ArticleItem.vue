<template>
  <div>
    <van-cell
      :to="`/article/` + article.art_id"
      v-if="article.cover.type === 0"
      :title="article.title"
      :label="label"
    ></van-cell>
    <van-cell
      :to="`/article/` + article.art_id"
      :label="label"
      v-else-if="article.cover.type === 1"
      :title="article.title"
    >
      <template #default>
        <van-image width="80" height="80" :src="article.cover.images[0]" />
      </template>
    </van-cell>
    <van-cell :to="`/article/` + article.art_id" v-else :title="article.title">
      <template #label>
        <van-image
          v-for="(item, index) in article.cover.images"
          :key="index"
          width="80"
          height="80"
          :src="item"
        />
        <p>{{ label }}</p>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    article: {
      type: Object,
      default: () => ({}) // 默认值传个空对象
    }
  },
  computed: {
    /* eslint-disable */
    label() {
      // 把要用到的作者，评论，时间这三个先解构出来
      const { aut_name, comm_count, pubdate } = this.article
      return `${aut_name} ${comm_count}评论 ${dayjs(pubdate).fromNow()}`
    }
  }
}
</script>

<style></style>
