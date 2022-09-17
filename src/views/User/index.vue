<template>
  <div>
    <!-- ------------个人信息导航-------------- -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- ------------------修改信息---------- -->
    <input
      @change="selectPhoto"
      type="file"
      ref="file"
      hidden
      accept=".png,.jpg"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="user.photo" />
    </van-cell>
    <!-- ------------更新头像弹出层----------- -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '100%' }"
      ></van-popup>
      <UpdateAvator
        :avator.sync="avator"
        v-if="isShowPhoto"
        :photo="photo"
      ></UpdateAvator>
    </van-popup>
    <!-- ----------------更新昵称---------------- -->
    <van-cell
      @click="isUpdateNameShow = true"
      title="昵称"
      :value="user.name"
      is-link
    ></van-cell>
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChangeNickname
        v-if="isUpdateNameShow"
        v-model="user.name"
        @close="isUpdateNameShow = false"
      ></ChangeNickname>
    </van-popup>
    <!-- ---------------------更改性别--------------- -->
    <van-cell
      @click="isUpdateGenderShow = true"
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
    ></van-cell>
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <ChangeGender
        v-model="user.gender"
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
      ></ChangeGender>
    </van-popup>
    <!-- -------------------------更改生日-------------- -->
    <van-cell
      @click="isUpdateBirthdayShow = true"
      title="生日"
      :value="user.birthday"
      is-link
    ></van-cell>
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <change-birthday
        v-model="user.birthday"
        v-if="isUpdateBirthdayShow"
        @close="isUpdateBirthdayShow = false"
      ></change-birthday>
    </van-popup>
  </div>
</template>

<script>
/* 1. 点击修改头像，手动触发input:file的点击事件
hidden： 等于display：none
accept: 规定file选择文件的类型
 */
import UpdateAvator from './cpns/UpdateAvator.vue'
import ChangeBirthday from './cpns/ChangeBirthday.vue'
import ChangeGender from './cpns/ChangeGender.vue'
import ChangeNickname from './cpns/ChangeNickname.vue'
import { resolveToBase64 } from '@/utils'
import { getUserAPI } from '@/api/user'
export default {
  data() {
    return {
      isUpdateBirthdayShow: false,
      isUpdateGenderShow: false,
      isUpdateNameShow: false,
      isShowPhoto: false,
      show: false,
      photo: '',
      avator: '',
      user: {}
    }
  },
  components: {
    UpdateAvator,
    ChangeNickname,
    ChangeGender,
    ChangeBirthday
  },
  created() {
    this.getUser()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async selectPhoto() {
      // 获取用户选择的图片
      const file = this.$refs.file.files[0]
      const base64 = await resolveToBase64(file)
      console.log(base64)
      //   console.log(file)
      /* file对象转成img.src可识别属性
         file对象转成base64，FileReader:文件阅读器
         const fr = new FileReader(); fr.readAsDataURL(file);
         */
      // 接收读取的结果：fr.onload = (e)=> {e.target.result/*base64*/
      // 传递base64给子组件
      this.photo = base64
      // 打开弹窗
      this.isShowPhoto = true
      // 解决不能连续选中同一张图片的问题
      this.$refs.file.value = ''
    },
    async getUser() {
      const { data } = await getUserAPI()
      // console.log(data)
      this.user = data.data
    },
    changeName() {}
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff !important;
  }
  :deep(.van-icon) {
    color: #fff !important;
  }
}
</style>
