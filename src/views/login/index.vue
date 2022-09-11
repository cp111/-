<template>
  <div>
    <van-nav-bar title="登录" class="nav-bar" />
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            block
            class="btn"
            round
            native-type="button"
            size="small"
            type="default"
            v-if="isShowCodeBtn"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            :time="5 * 1000"
            format="ss 秒"
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from '@/views/login/rule'
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      isShowCodeBtn: true,
      mobile: '',
      code: '',
      mobileRules, // 规则引入后data里面注册一下
      codeRules
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    // submit事件只有表单验证通过后才会触发
    async onSubmit() {
      // toast一次默认只会显示一个
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.mobile, this.code)
        // console.log(data)
        this.SET_TOKEN(data.data)
        this.$router.push('/my')
        this.$toast.success('登陆成功')
      } catch (error) {
        // error： 1.js的报错    2. axios封装的error对象
        // error对象： error.response.data  后台返回的数据
        //   error.response.status  后端返回的状态码
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // js的错误
          // console.dir(error)
          this.$toast.clear()
          throw error
        }
      }
    },
    // 把加载封装成一个函数
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    // 发送验证码
    async sendCode() {
      // 验证用户是否输入有效的手机号
      // 查文档 form组件，validate：验证表单，支持传入一个或多个 name 来验证单个或部分表单项，不传入 name 时，会验证所有表单项，name指form组件的属性
      await this.$refs.form.validate('mobile')
      this.loading()
      try {
        await sendCodeAPI(this.mobile)
        this.isShowCodeBtn = false
        this.$toast.success('发送成功')
      } catch (error) {
        if (
          (error.response && error.response.status === 429) ||
          error.response.status === 404
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
      // 显示倒计时组件
      this.isShowCodeBtn = false
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  background-color: #3296fa;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
}
/deep/.form {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
  .btn {
    height: 0.64rem;
    background-color: #eee;
    color: #a58594;
  }
}
</style>
