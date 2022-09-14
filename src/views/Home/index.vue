<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button block size="small" round icon="search">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 频道 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in getChannelList" :key="item.id" :title="item.name">
        <!-- 文章详情组件 -->
        <art-list :id="item.id"></art-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      closeable
      close-icon-position="top-left"
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- $event是子组件传过来的那个index -->
      <ChannelEdit
      v-if="isShow"
        @change-active=";[(isShow = false), (active = $event)]"
        :myChannels="getChannelList"
        @delChannel="delChannel"
        @addChannel="addChannel"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ChannelEdit from '@/views/Home/components/ChannelEdit.vue'
import ArtList from './components/ArtList.vue'
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api/channel'
export default {
  components: {
    ArtList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      getChannelList: [],
      isShow: false
    }
  },
  created() {
    this.initChannles()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  /*  ?? 类似于 || 常用语语句
     ?. 可选链操作符， ？ 前面是undefined，那么不会往后面取值 */
  methods: {
    ...mapMutations(['SET_MY_CHANNELS']),
    initChannles() {
      if (!this.isLogin) {
        this.getChannel()
      } else {
        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.getChannel()
        } else {
          this.getChannelList = myChannels
        }
      }
    },
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        // console.log(data)
        this.getChannelList = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 && this.$toast.fail('服务端异常，请刷新')
        }
      }
    },

    async delChannel(id) {
      try {
        // newChannels是删除后最新的
        const newChannels = this.getChannelList.filter((item) => item.id !== id)
        if (!this.isLogin) {
          await delChannelAPI(id)
        } else {
          this.SET_MY_CHANNELS(newChannels)
        }

        this.getChannelList = newChannels
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再删除')
        } else {
          throw error
        }
      }
    },
    async addChannel(value) {
      try {
        if (!this.isLogin) {
          await addChannelAPI(value.id, this.getChannelList.length)
        } else {
          // 扩展运算符把就的值展开，再跟新的值合并
          this.SET_MY_CHANNELS([...this.getChannelList, value])
        }
        // 这个vaule是新的添加的频道
        this.getChannelList.push(value)
        this.$toast.success('添加成功')
      } catch (error) {
        if (error.response && error.response.statys === 401) {
          this.$toast.fail('请登录再添加')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
