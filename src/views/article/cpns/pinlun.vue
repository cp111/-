<template>
  <div class="pinlun">
    <van-field
      v-model.trim="message"
      rows="2"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button @click="send">发布</van-button>
  </div>
</template>

<script>
import { postArticleCommentAPI } from '@/api/news'
export default {
  props: {
    target: {
      typr: Object,
      required: true
    }
  },
  data() {
    return {
      show: false,
      message: ''
    }
  },

  methods: {
    showPopup() {
      this.show = true
    },
    async send() {
      if (this.message.length === 0) {
        return this.$toast('内容不能为空')
      }
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0 // 持续展示 toast
        })
        const { data } = await postArticleCommentAPI(
          this.target.art_id,
          this.message,
          this.target.art_id
        )
        console.log(data)
        // 清空文本框
        this.message = ''
        // 把发布成功后得到的数据传给父组件，让父组件来使用
        this.$emit('postSuccess', data.data)
        this.$toast.success('发布成功')
      } catch (error) {
        this.$toast.fail('发布失败', error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pinlun {
  display: flex;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
  .van-button--normal {
    width: 140px;
    height: 88px;
    margin-top: 70px;
    padding: 0 30px;
    font-size: 28px;
    border: unset;
    color: #bdd6ee;
  }
}
</style>
