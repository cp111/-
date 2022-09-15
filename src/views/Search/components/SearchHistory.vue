<template>
  <div>
    <!-- 搜索历史的标题 -->
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon
          name="delete-o"
          v-if="!isEdit"
          @click="isEdit = true"
        ></van-icon>
        <!-- 点击事件，让vuex里面的SET_HISTORIES，给他传入一个空数组 -->
        <div v-else>
          <span @click="$store.commit('SET_HISTORIES', [])">全部删除</span
          >&nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <!-- 搜索历史 -->
    <van-cell
      @click="!isEdit && $emit('change-keywords', item)"
      v-for="(item, index) in histories"
      :key="index"
      :title="item"
    >
      <template #extra>
        <van-icon
          @click="
            $store.commit(
              'SET_HISTORIES',
              histories.filter((i) => item !== i)
            )
          "
          name="close"
          v-show="isEdit"
        ></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState(['histories'])
  }
}
</script>

<style></style>
