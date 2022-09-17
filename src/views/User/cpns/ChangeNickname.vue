<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <van-field
      v-model.trim="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="8"
      placeholder="请输入留言"
      show-word-limit
    />
  </div>
</template>

<script>
import { updateUserProfileAPI } from '@/api/user'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localName: this.value
    }
  },
  methods: {
    async onClickRight() {
      try {
        const localName = this.localName
        if (!localName.length) {
          return this.$toast('昵称不能为空')
        }
        const { data } = await updateUserProfileAPI({
          name: localName
        })
        console.log(data)
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-field__control {
  height: 96px;
  width: 100%;
}
</style>
