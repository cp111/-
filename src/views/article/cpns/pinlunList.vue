<template>
  <div>
    <!--添加immediate-check属性，初始化的时候不触发加载，滚动滚轮才触发  -->
    <van-list
      @load="onLoad"
      offset="300"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      ref="postSuccess"
    >
      <pinlunItem
        @reply-click="$emit('reply-click', $event)"
        v-for="(item, index) in list"
        :key="index"
        :pinlunList="item"
      />
    </van-list>
  </div>
</template>

<script>
import pinlunItem from './pinlunItem.vue'
import { getCommentListAPI } from '@/api/news'
export default {
  components: { pinlunItem },
  props: {
    type: {
      type: [String, Number],
      default: 'a'
    },
    source: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      OnpostSuccess: {},
      list: [],
      loading: false,
      finished: false,
      offset: null
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getCommentListAPI({
          type: this.type, // props里面不传默认a
          source: this.source,
          offset: this.offset
        })
        console.log(data)
        this.$emit('pinlunNum', data.data)
        const result = data.data.results
        console.log(this.list)
        console.log(result)
        this.list.push(...result)
        if (data.data.results.length) {
          // 如果还有数据更新下一页
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('请刷新', error)
        // 加载失败
        this.loading = false
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
