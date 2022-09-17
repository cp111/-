<template>
  <div>
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @change="onChange"
      :default-index="value"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { updateUserProfileAPI } from '@/api/user'
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  methods: {
    async onConfirm() {
      try {
        const gender = this.gender
        const { data } = await updateUserProfileAPI({
          gender
        })
        console.log(data)
        this.$emit('input', gender)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    },
    onCancel() {
      this.$emit('close')
    },
    onChange(picker, value, index) {
      this.gender = index
    }
  }
}
</script>

<style></style>
