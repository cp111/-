<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- -----------------回复评论弹出层----------------- -->
    <van-popup
      v-model="replyShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <pinlunReply
        @closeReplyShow="replyShow = false"
        :comment="currentComment"
        :articleId="getArticlesDetailList.art_id"
      ></pinlunReply>
    </van-popup>
    <!-- -----------------回复评论弹出层----------------- -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <!-- <div class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div> -->
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title" ref="article-content">
          {{ getArticlesDetailList.title }}
        </h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="getArticlesDetailList.aut_photo"
          />
          <div slot="title" class="user-name">
            {{ getArticlesDetailList.aut_name }}
          </div>
          <div slot="label" class="publish-date">
            {{ getArticlesDetailList.pubdate }}
          </div>
          <van-button
            v-if="getArticlesDetailList.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="followUsers"
            >已关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="followUsers"
            >关注</van-button
          >
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="getArticlesDetailList.content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- ---------------------评论列表---------------- -->
      <pinlunList
        @reply-click="onReplyClick"
        ref="postSuccess"
        v-if="getArticlesDetailList.art_id"
        :source="getArticlesDetailList.art_id"
        @pinlunNum="pinlunNum = $event.total_count"
      ></pinlunList>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <!-- <div class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div> -->
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <!-- <div class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div> -->
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="show = true"
        >写评论</van-button
      >
      <!--  评论弹出层 -->
      <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
        <pinlun
          @postSuccess="postSuccess"
          :target="getArticlesDetailList"
        ></pinlun>
      </van-popup>
      <van-icon name="comment-o" :info="pinlunNum" color="#777" />
      <van-icon
        color="#777"
        :name="getArticlesDetailList.is_collected ? 'star' : 'star-o'"
        @click="userFavorites"
      />
      <van-icon
        color="#777"
        :name="(getArticlesDetailList.attitude === 1 ? 'good-job' : 'good-job-o')"
        @click="articleLikes"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import pinlunReply from './cpns/pinlunReply.vue'
import pinlunList from './cpns/pinlunList.vue'
import pinlun from './cpns/pinlun.vue'
import {
  getArticlesDetailAPI,
  followUsersAPI,
  delefollowUsersAPI,
  userFavoritesAPI,
  deleuserFavoritesAPI,
  articleLikesAPI,
  delearticleLikesAPI
} from '@/api/news'
import { ImagePreview } from 'vant'
export default {
  components: {
    pinlun,
    pinlunList,
    pinlunReply
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      currentComment: {}, // 当前点击回复的评论项
      replyShow: false,
      pinlunNum: 0,
      show: false,
      getArticlesDetailList: {}
    }
  },
  created() {
    this.getArticlesDetail()
  },
  methods: {
    previewImage() {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      console.log(imgs)
      const imgsList = []
      imgs.forEach((img, index) => {
        imgsList.push(img.src)
        //   console.log(imgsList)
        img.onclick = () => {
          ImagePreview({
            images: imgsList,
            startPosition: index
          })
        }
      })
    },
    async getArticlesDetail() {
      try {
        const { data } = await getArticlesDetailAPI(this.articleId)
        console.log(data)
        this.getArticlesDetailList = data.data
        // 数据驱动视图是异步，数据更新以后不能马上得到，可以延迟拿到
        setTimeout(() => {
          // 封装成函数
          this.previewImage()
        }, 0)
      } catch (error) {
        console.log(error)
      }
    },
    postSuccess(data) {
      this.show = false
      // 用ref属性，控制整个组件，使用里面的数组方法，把传给父组件的数据追加到list里面
      this.$refs.postSuccess.list.unshift(data.new_obj)
    },
    onReplyClick(pinlunList) {
      this.replyShow = true
      this.currentComment = pinlunList
    },
    async followUsers() {
      try {
        if (this.getArticlesDetailList.is_followed) {
          await delefollowUsersAPI(this.getArticlesDetailList.aut_id)
          // 更新视图
          this.getArticlesDetailList.is_followed = false
        } else {
          await followUsersAPI(this.getArticlesDetailList.aut_id)
          // 更新视图
          this.getArticlesDetailList.is_followed = true
        }
      } catch (error) {
        this.$toast('操作失败', error)
      }
    },
    async userFavorites() {
      try {
        if (this.getArticlesDetailList.is_collected) {
          await deleuserFavoritesAPI(this.getArticlesDetailList.art_id)
          this.getArticlesDetailList.is_collected = false
        } else {
          await userFavoritesAPI(this.getArticlesDetailList.art_id)
          this.getArticlesDetailList.is_collected = true
        }
      } catch (error) {
        this.$toast('操作失败', error)
      }
    },
    async articleLikes() {
      try {
        if (this.getArticlesDetailList.attitude !== 1) {
          await articleLikesAPI(this.getArticlesDetailList.art_id)
          this.getArticlesDetailList.attitude = 1
        } else {
          await delearticleLikesAPI(this.getArticlesDetailList.art_id)
          this.getArticlesDetailList.attitude = 0
        }
      } catch (error) {}
    }
  }
}
</script>

<style scoped lang="less">
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
  font-size: 35px;
}
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
