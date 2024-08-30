<template>
  <div>
    <div v-show="show" class="layer"></div>
    <transition name="el-fade-in-linear">
      <div v-show="show" class="tips">
        <img class="tips-close" @click="closeFun" src="@/assets/images/profile/close_icon.png" alt="">
        <p class="tips-title font" v-show="state == 0">Out of energy</p>
        <p class="tips-title font" v-show="state == 1">Failed to login</p>
        <p class="tips-title font" v-show="state == 2">Notifications</p>
        <img v-if="state == 0" class="tips-img" src="@/assets/images/common/tips_bg1.png" alt="">
        <img v-else class="tips-img" src="@/assets/images/detail_icon.png" alt="">
        <p class="tips-content font" v-show="state == 0">
          Sorry, your energy points are insufficient Invite friends to boost your energy!
        </p>
        <p class="tips-content font" v-show="state == 1">
          Login failed, please reconnect.
        </p>
        <p class="tips-content font" v-show="state == 2">
          Are you sure you want to return to the home page of the quiz?
        </p>
        <div class="tips-bottom flex">
          <div class="tips-btn font" @click="closeFun">Cancel</div>
          <div class="tips-btn tips-click font" v-show="state == 0" @click="shareBtn">Frens</div>
          <div class="tips-btn tips-Reconnect font" v-show="state == 1" @click="reconnectFun">Reconnect</div>
          <div class="tips-btn tips-Reconnect font" v-show="state == 2" @click="returnBtn">Confirm</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Tips',
  props: {
    msg: String,
    tipsShow: { type: Boolean, default: false },
    tipsState: { type: Number, default: 0 },
  },
  data() {
    return {
      show: this.tipsShow,
      state: this.tipsState,//0-能量不足 1-登录
    }
  },
  watch: {
    tipsShow: {
      handler(newVal) {
        this.show = newVal
      },
    },
    tipsState: {
      handler(newVal) {
        this.state = newVal
      },
    },
  },
  mounted() {
  },
  methods: {
    closeFun() {
      this.$emit("dialogClose")
    },
    //重新登录
    reconnectFun(){
      this.$emit("dialogClose")
      this.$emit("reconnectLogin")
    },
    //分享
    shareBtn(){
      this.$emit("shareClick")
    },
    returnBtn(){
      this.$emit("return")
    }
  }
}
</script>
<style lang="scss" scoped>
.tips {
  width: 678px;
  background: #F0EFE6;
  box-shadow: 4px 12px 0px 3px rgba(0, 0, 0, 0.33), inset 0px -18px 0px 0px #C6AB86;
  border-radius: 70px;
  border: 6px solid #000000;
  position: fixed;
  top: 28vh;
  left: 30px;
  z-index: 90;
  text-align: center;
  padding-bottom: 70px;

  .tips-close {
    width: 56px;
    height: auto;
    margin: -10px -4px 0 auto;
    display: block;
  }

  .tips-title {
    font-size: 40px;
    color: #232323;
    margin: 13px 0 38px 0;
  }

  .tips-img {
    width: 170px;
    height: auto;
  }

  .tips-content {
    width: 600px;
    margin: 0 auto 60px auto;
    text-align: center;
    color: #2D3746;
    font-size: 28px;
    line-height: 36px;
  }

  .tips-bottom {
    justify-content: center;

    .tips-btn {
      width: 300px;
      height: 92px;
      background: #2D3746;
      box-shadow: 4px 10px 0px 0px rgba(0, 0, 0, 0.33), inset 0px -18px 0px 0px #222A35;
      border-radius: 80px;
      border: 6px solid #000000;
      font-size: 32px;
      text-align: center;
      color: #fff;
      line-height: 82px;
      margin: 0 15px;
    }

    .tips-click {
      background: #AEFF00;
      box-shadow: 4px 10px 0px 0px rgba(0, 0, 0, 0.33), inset 0px -18px 0px 0px #80B906;
      color: #2D3746;
    }
    .tips-Reconnect {
      background: #5185F3;
box-shadow: 4px 10px 0px 0px rgba(0,0,0,0.33), inset 0px -18px 0px 0px #355AA9;
      color: #fff;
    }
  }
}
</style>
