<template>
  <div class="channel-edit">
    <!---------------- 我的频道 --------------->
    <van-cell title="我的频道">
      <van-button
        class="btn"
        plain
        type="danger"
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <div class="my-pannel">
      <van-grid :gutter="10" :border="false">
        <van-grid-item
          v-for="(item, index) in myChannels"
          :key="item.id"
          :text="item.name"
          :class="{ active: item.name == '推荐' }"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          @click="handleMyChannel(item, index)"
        />
        <template #icon>
          <van-icon name="cross" />
        </template>
      </van-grid>
    </div>
    <!---------------- 推荐频道---------------->
    <van-cell title="推荐频道"> </van-cell>
    <div class="recommend-pannel">
      <van-grid :gutter="10" :border="false">
        <van-grid-item
          v-for="value in recommendChannels"
          :key="value.id"
          :text="value.name"
          @click="$emit('addChannel',value)"
        >
          <template #icon>
            <van-icon name="plus" />
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelAPI } from '@/api/channel'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      getAllChannelList: []
    }
  },
  created() {
    this.getAllChannel()
  },
  methods: {
    async getAllChannel() {
      const { data } = await getAllChannelAPI()
      // console.log(data)
      this.getAllChannelList = data.data.channels
      // console.log(this.getAllChannelList)
    },
    handleMyChannel({ name, id }, index) {
      if (this.isEdit && name !== '推荐') {
        this.$emit('delChannel', id)
      } else {
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    recommendChannels() {
      return this.getAllChannelList.filter((allChannelItem) => {
        return !this.myChannels.find((myChannelsItem) => {
          return myChannelsItem.id === allChannelItem.id
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.active {
  .van-grid-item__text {
    color: red;
  }
}
.channel-edit {
  padding-top: 92px;
  /deep/.btn {
    width: 100px;
    font-size: 25px;
  }
  :deep(.van-grid-item__content) {
    background-color: #f4f5f6;
  }
  // 我的频道
  .my-pannel {
    // 编辑按钮居中
    .van-cell__value {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    // 关闭按钮样式
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__content {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  :deep(.van-icon-cross) {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 25px;
    transform: translate(20%, -35%);
    border: 0.02667rem solid #000;
    border-radius: 50%;
    text-align: center;
    line-height: 0.32rem;
  }
  // 推荐频道
  .recommend-pannel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
