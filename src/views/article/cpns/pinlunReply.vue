<template>
  <div class="banner">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '0条回复'
      "
    >
      <template #left>
        <van-icon name="arrow-left" @click="$emit('closeReplyShow')" />
      </template>
    </van-nav-bar>
    <!-- 当前评论项,让这个组件的pinlunList属性的值等于传进来的comment -->
    <pinlunItem :pinlunList="comment"></pinlunItem>
    <van-cell title="全部回复"></van-cell>
    <pinlunList :source="comment.com_id" type="c" ref="postSuccess"></pinlunList>
    <van-button size="large" @click="show = true">发布评论</van-button>
    <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
      <replypinlun :target="comment.com_id"
      :articleId="articleId"
      @postSuccess="postSuccess"
      ></replypinlun>
    </van-popup>
  </div>
</template>

<script>
import replypinlun from './replypinlun.vue'
import pinlunList from './pinlunList.vue'
import pinlunItem from './pinlunItem.vue'
export default {
  data() {
    return {
      show: false
    }
  },
  components: {
    pinlunItem,
    pinlunList,
    replypinlun
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    postSuccess(data) {
      this.show = false
      // 用ref属性，控制整个组件，使用里面的数组方法，把传给父组件的数据追加到list里面
      this.$refs.postSuccess.list.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.banner {
  padding-bottom: 100px;
}
.van-button--large {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
}
</style>
