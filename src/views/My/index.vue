<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <!-- 登录状态 -->
      <div class="login banner" v-if="!isLogin">
        <van-row></van-row>
        <van-row type="flex" align="center">
          <van-col span="12">
            <van-row type="flex" justify="space-around" align="center">
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{userInfo.name}}</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-button size="mini" round class="edit-btn">编辑按钮</van-button>
          </van-col>
        </van-row>
        <van-row>
          <van-grid :border="false" class="grid">
            <van-grid-item icon="photo-o" text="头条">
              <template #icon> {{userInfo.art_count}} </template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="粉丝">
              <template #icon> {{userInfo.fans_count}} </template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="关注">
              <template #icon> {{userInfo.follow_count}} </template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="获赞">
              <template #icon> {{userInfo.like_count}} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录状态 -->
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image
          :src="require('@/assets/images/mobile.png')"
          width="1.76rem"
          height="1.76rem"
        />
        <span class="text">登录/注册</span>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid column-num="2" clickable>
        <van-grid-item icon="photo-o" text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-linnk />
        <van-cell title="小智同学" is-linnk />
      </div>
    </main>

    <!-- 底部 -->
    <footer>
      <van-button block v-if="!isLogin" style="color: red" @click="logout"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserInfoAPI } from '@/api'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    async getUserInfo() {
      try {
        if (this.isLogin) return // 判断 登录了以后再发请求
        const { data } = await getUserInfoAPI()
        // console.log(data)
        this.userInfo = data.data
      } catch (error) {
        // 400,507是给程序员的提示，401是给用户的提示，重新登陆
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请重新登录')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.profile {
  height: 100vh;
  background-color: #f5f7f9;
}
.link {
  margin: 10px 0;
}
.toutiao {
  font-size: 40px;
}
.toutiao-shoucang {
  color: red;
}
.toutiao-lishi {
  color: orange;
}
.banner {
  width: 100%;
  height: 5.33333rem;
  background: url('@/assets/images/banner.png') no-repeat 0 0 / cover;
  /* background-size: cover;   符合写法必须有position*/
}
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .edit-btn {
    width: 1.6rem;
    height: 100%;
    color: #666;
  }
  /deep/.grid {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: transparent;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
