<template>
  <div class="home-box">
    <div class="home">
      <div class="home-header flex">
        <p v-if="startState" class="home-header-edenx font black stroke" @click="tipsShow = true, tipsState = 2">Back
          &nbsp;</p>
        <p v-else class="home-header-edenx font black stroke">Eden X &nbsp;</p>
        <div v-if="userInfo" class="home-header-list">
          <img class="home-header-list-img1" src="@/assets/images/cute_star.png" alt="">
          <p class="home-header-list-txt font stroke black">{{ userInfo.Points }}</p>
        </div>
        <div class="home-header-list" @click="profileState = true">
          <img class="home-header-list-img2" src="@/assets/images/my_user.png" alt="">
        </div>
      </div>
      <div v-if="userInfo" class="home-point flex" :class="{ 'home-point-hidden': startState }">
        <!-- 能量充足 -->
        <div v-if="userInfo.Energy > 0" class="home-point-detail">
          <div class="flex" style="justify-content: center">
            <p class="home-point-num font black stroke">{{ userInfo.Energy }}</p>
            <img class="home-point-detail-img" src="@/assets/images/electric_icon.png" alt="">
          </div>
          <p class="home-point-name font black stroke">Energy points </p>
        </div>
        <!-- 能量不足 -->
        <div v-else class="home-point-detail recharging">
          <div class="recharging-img">
            <img src="@/assets/images/recharging_bg02.png" alt="">
          </div>
          <p class="home-point-num home-point-num2 font black stroke">Recharging&ensp;</p>
          <p class="home-point-name font black stroke">23:15:22</p>
        </div>
        <img class="home-point-airship" src="@/assets/images/airship_img.png" alt="">
        <img class="home-point-bg" src="@/assets/images/line_01.png" alt="">
      </div>
      <div class="rule" :class="{ 'rule-height': startState }">
        <div v-if="startState" class="rule_bg"></div>
        <img v-else class="rule_bg" src="@/assets/images/bg_03.png" alt="">
        <div v-if="!startState">
          <div class="rule-detail">
            <img class="detail-bg-top" src="@/assets/images/detail_top.png" alt="">
            <img class="detail-bg-bottom" src="@/assets/images/detail_bottom.png" alt="">
            <img class="detail-bg-icon" src="@/assets/images/detail_icon.png" alt="">
            <p class="rule-detail-title font white zindex1">Quiz Rules</p>
            <p class="rule-detail-content font zindex1">
              -Each person receives
              <span style="color: #FFE600;">5</span>
              energy
              <span style="color: #AEFF00;">points daily</span>.
            </p>
            <p class="rule-detail-content font zindex1">
              -You lose
              <span style="color: #FF2369;">1</span>
              energy point for each wrong answer,but correct answers don't use any energy.
            </p>
            <p class="rule-detail-content font zindex1">
              -If your energy points hit
              <span style="color: #FF2369;">zero</span>
              , you can't answer any more questions.
            </p>
          </div>
          <div v-if="point > 0">
            <div class="rule-btn rule-btn-start" @click="startAnswer(1)">
              <p class="rule-btn-name font white">Web3 Ecosystem</p>
              <img class="rule-btn-icon rule-btn-icon2" src="@/assets/images/start_icon3.png" alt="">
            </div>
            <div class="rule-btn rule-btn-start" @click="startAnswer(2)">
              <p class="rule-btn-name font white">Move Technology</p>
              <img class="rule-btn-icon rule-btn-icon2" src="@/assets/images/start_icon3.png" alt="">
            </div>
          </div>
          <div v-else>
            <div class="rule-btn rule-btn-energy">
              <p class="rule-btn-name font" style="color:#939AB2;">Web3 Ecosystem</p>
              <img class="rule-btn-icon rule-btn-icon2" src="@/assets/images/start_icon4.png" alt="">
            </div>
            <div class="rule-btn rule-btn-energy">
              <p class="rule-btn-name font" style="color:#939AB2;">Move Technology</p>
              <img class="rule-btn-icon rule-btn-icon2" src="@/assets/images/start_icon4.png" alt="">
            </div>
          </div>
          <div class="rule-btn rule-btn-share">
            <p class="rule-btn-name font black" @click="shareFun">Frens</p>
            <img class="rule-btn-icon" src="@/assets/images/share_icon.png" alt="">
          </div>
        </div>
        <div class="answer-box" v-else>
          <div class="rule-detail">
            <img class="detail-bg-top" src="@/assets/images/detail_top.png" alt="">
            <img class="detail-bg-bottom" src="@/assets/images/detail_bottom.png" alt="">
            <img class="detail-bg-icon" src="@/assets/images/detail_icon.png" alt="">
            <p class="rule-detail-title font white zindex1">Question {{ questionIndex }}</p>
            <p class="rule-detail-content font zindex1">
              {{ answerDate.text }}
            </p>
          </div>
          <div v-if="answerDate" class="question zindex1">
            <div v-for="(item, index) in answerDate.options" :key="index" @click="answerClick(index, item.OptionID)"
              :class="backgroundStyle(index)" class="question-list">
              <div v-if="mineAnswer != null && Number(mineAnswer) == Number(index) && rightKey != null">
                <div v-if="Number(mineAnswer) == Number(rightKey)">
                  <img class="question-list-top" src="@/assets/images/answer/right_bg1.png" alt="">
                  <img class="question-list-bottom" src="@/assets/images/answer/right_bg3.png" alt="">
                  <img class="question-list-icon" src="@/assets/images/start_icon.png" alt="">
                </div>
                <div v-else>
                  <img class="question-list-top" src="@/assets/images/answer/fail_bg1.png" alt="">
                  <img class="question-list-bottom" src="@/assets/images/answer/fail_bg3.png" alt="">
                  <img class="question-list-icon" src="@/assets/images/start_icon2.png" alt="">
                </div>
              </div>
              <div v-else>
                <div v-if="rightKey == index && mineAnswer != null">
                  <img class="question-list-top" src="@/assets/images/answer/right_bg1.png" alt="">
                  <img class="question-list-bottom" src="@/assets/images/answer/right_bg3.png" alt="">
                  <img class="question-list-icon" src="@/assets/images/start_icon.png" alt="">
                </div>
                <div v-else>
                  <img class="question-list-top" src="@/assets/images/answer/answer_bg1.png" alt="">
                  <img class="question-list-bottom" src="@/assets/images/answer/answer_bg3.png" alt="">
                </div>
              </div>
              <p class="question-list-content font zindex1">
                {{ index | answerIndex }}. {{ item.OptionText }}
              </p>
            </div>
          </div>
          <div class="zw"></div>
        </div>
      </div>
      <!-- 下一题 -->
      <transition name="el-zoom-in-bottom">
        <div v-show="nextShow" class="bottom" :class="{ 'explanation': explanationShow }">
          <div v-if="explanationShow">
            <img class="bottom-close" @click="explanationShow = false" src="@/assets/images/profile/close_icon.png"
              alt="">
            <p class="bottom-title font white">Question Explanation</p>
            <p class="bottom-content font white">
              {{ resultData.correct_text }}
            </p>
          </div>
          <div class="bottom-btn">
            <p class="bottom-detail font black" @click="explanationShow = true">Question Explanation</p>
            <p class="bottom-next font black" @click="nextBtn">Next</p>
          </div>
        </div>
      </transition>
      <div v-if="explanationShow" class="layer"></div>
      <!-- 个人中心 -->
      <profile :profileState="profileState" @dialogClose="closeProfile"></profile>
      <!-- 提示框 -->
      <tips :tipsShow="tipsShow" :tipsState="tipsState" @dialogClose="closeTips" @reconnectLogin="login"
        @shareClick="shareFun" @return="returnFun"></tips>
      <!-- 开屏页 -->
      <open-view :show="openShow"></open-view>
    </div>
  </div>
</template>

<script>
import profile from "@/components/profile.vue";
import tips from "@/components/tips.vue";
import openView from "@/components/openView.vue";
import { getEncrypt, getDecrypted } from "@/utils/encrypt";
import { login } from '@/api/user'
// import { getQueryString } from "@/utils/getUrl";
export default {
  filters: {
    answerIndex(index) {
      if (index == 0) return 'A'
      if (index == 1) return 'B'
      if (index == 2) return 'C'
      if (index == 3) return 'D'
    }
  },
  name: 'HomeView',
  data() {
    return {
      point: 4,//能量是否充足
      profileState: false,//我的
      startState: false,//是否开始答题
      rightKey: null,//正确答案
      mineAnswer: null,//我选择的答案
      // question: [
      //   { txt: "Blockchain primarily enables which of the following?" },
      //   { txt: 'Blockchain primarily enables which of the following?Blockchain primarily enables which of the following?Blockchain primarily enables which of the following?Blockchain primarily enables which of the following?Blockchain primarily enables which of the foll' },
      //   { txt: 'BlockchainBlockchainBlockchainBlockchainBlockchainBlockchainBlockchainBlockchainBlockchainBlockchain primarily enables which of the following?Blockchain primarily enables which of the following?Blockchain primarily enables which of the following?Blockchain primarily enables which of the following?Blockchain primarily enables which of the foll' }
      // ],
      questionIndex: 0,
      nextShow: false,//下一题
      explanationShow: false,//答案解析
      resultData: null,//答题结果
      tipsShow: false,//提示框
      tipsState: 0,//0-能量不足 1-登录 2-答题返回
      openShow: false,//开屏页
      path: "wss://alpha.edenxminiapp.edenx.xyz/api/v1/ws",
      // path: "wss://toolin.cn/echo",
      socket: "",
      startType: null,//1-生态 2-move
      lockReconnect: false,
      timeoutnum: null,
      userInfo: null,
      answerDate: {
        text:null,
        options:null
      },//题目
      InviteCode: null
    }
  },
  components: {
    profile,
    tips,
    openView
  },
  computed: {
    getLoginShow() {
      return this.$store.state.loginModal.show
    },
  },
  watch: {
    getLoginShow: {
      handler(nval) {
        if (nval) {
          this.tipsState = 1
        }
        this.tipsShow = nval
      }
    },
  },
  mounted() {
    // console.log('打印----')
    // console.log(getQueryString('code'))
    // this.InviteCode = getQueryString('code')
    // console.log('用户信息')
    // console.log(window.Telegram.WebApp.initDataUnsafe)
    this.login()
    // this.initWebSocket();
    // window.addEventListener("onmessageWS", this.getSocketData);
    // this.init()
  },
  methods: {
    closeProfile() {
      this.profileState = false
    },
    //答题
    answerClick(index, OptionID) {
      if (this.mineAnswer != null) return
      this.mineAnswer = index
      // this.nextShow = true
      let dataToEncrypt = {
        "message_todo_type": "todo_end_answering", // 开始答题
        "selected_option": OptionID, // 默认传0
        "question_type": this.startType //答题类型 1.生态 2.move语言
      }
      let data = {
        data: getEncrypt(dataToEncrypt)
      }
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(data));
      } else {
        console.log('WebSocket is not connected.');
        this.reconnectOne()
      }
    },

    backgroundStyle(index) {
      if (this.mineAnswer != null && this.mineAnswer == index && this.rightKey != null) {
        if (this.mineAnswer == this.rightKey) {
          return 'rightStyle'
        } else {
          return 'failStyle'
        }
      } else {
        if (this.rightKey == index && this.mineAnswer != null) {
          return 'rightStyle'
        } else {
          return 'answerStyle'
        }
      }
    },
    //下一题
    nextBtn() {
      if (this.userInfo.Energy > 0) {
        this.nextShow = false
        this.mineAnswer = null
        this.explanationShow = false
        this.rightKey = null
        this.answerDate = {
        text:null,
        options:null
      }
        this.startAnswer(this.startType)
      } else {
        this.tipsState = 0
        this.tipsShow = true
      }
    },
    closeTips() {
      if (this.tipsState == 2) {
        this.tipsShow = false
        this.tipsState = 0
        return
      }
      this.$store.state.loginModal.show = false
      this.startState = false
      // this.point = 0
      this.nextShow = false
      this.tipsShow = false
      if (this.tipsState == 1) {
        this.openShow = false
      }
    },
    //登录
    login() {
      let Telegram = window.Telegram
      let user = window.Telegram.WebApp.initDataUnsafe.user
      if (user) {
        console.log('页面启动----')
        console.log(window.Telegram.WebApp)
        let languageStorage = window.Telegram.WebApp.initDataUnsafe.user.language_code || null
        localStorage.setItem('languageStorage', languageStorage);
        // console.log(languageStorage)
        this.InviteCode = window.Telegram.WebApp.initDataUnsafe.start_param
        // console.log('code---', this.InviteCode)
        let initData = Telegram.WebApp.initData || ''
        let data = {
          "initData": initData,
          "invite_code": this.InviteCode
        }
        let encrypt = getEncrypt(data)
        login(JSON.stringify({ "data": encrypt })).then(res => {
          console.log(res.data.data)
          console.log('接口返回值--', JSON.parse(getDecrypted(res.data.data)))
          this.openShow = true
          this.$store.commit('updateUserInfo', JSON.parse(getDecrypted(res.data.data)))
          this.userInfo = JSON.parse(getDecrypted(res.data.data))
          this.init()
          // this.initWebSocket();
          // window.addEventListener("onmessageWS", this.getSocketData);
        })
      }
    },
    // async initWebSocket() {
    //   this.$websocket.initWebSocket();
    // },
    // getSocketData(res) {
    //   // this.PieValue = Number(res.detail.data.sendInfoStr.onlineUserCount);
    //   // this.userNumValue = Number(res.detail.data.sendInfoStr.totalUserCount);
    //   console.log("ws返回信息", res)
    // },


    //websocket
    init: function () {
      if (typeof (WebSocket) === "undefined") {
        alert("您的浏览器不支持socket")
      } else {
        // 实例化socket
        // let token = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE3MjM5NTkxNDQsInVzZXJfaWQiOjQwfQ.tqOyMdqiM0T9FUHseoO78r2i6CxnvJRvaK5PhybPpQc'
        let data = {
          'accept_language': 'zh-CN',
          'authorization': 'Bearer ' + this.userInfo.Token
        }
        let encryptData = getEncrypt(data)
        // console.log(encryptData)
        let url = this.path + '?auth=' + encodeURIComponent(encryptData)
        // console.log(url)
        this.socket = new WebSocket(url)
        // console.log(getDecrypted(encryptData))
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open: function () {
      console.log("socket连接成功")
    },
    error: function () {
      console.log("连接错误")
      this.reconnectOne()
    },
    getMessage: function (msg) {
      console.log('webscoket返回信息', msg)
      console.log(JSON.parse(msg.data))
      let data = JSON.parse(msg.data)
      if (data.error_code == 0) {
        console.log(getDecrypted((JSON.parse(msg.data)).data))
        let returnData = getDecrypted((JSON.parse(msg.data)).data)
        console.log(JSON.parse(returnData))

        if ((JSON.parse(returnData)).correct_option) {
          this.resultData = JSON.parse(returnData)
          this.answerDate.options.forEach((item, index) => {
            if (item.OptionID == this.resultData.correct_option) {
              this.rightKey = index
            }
          });
          this.nextShow = true
          this.userInfo.Points = this.resultData.points
          this.userInfo.Energy = this.resultData.energy
          this.$store.commit('updateUserInfo', this.userInfo)
          return
        }else{
          // this.$nextTick(() => {
          //   this.answerDate = JSON.parse(returnData)
          // })
          this.$set(this.answerDate, 'text', JSON.parse(returnData).text)
          this.$set(this.answerDate, 'options', JSON.parse(returnData).options)
        }
        if (this.startType) {
          this.startState = true
          this.questionIndex++
        }
      } else if (data.error_code == 1003) {
        //被踢
        this.$store.commit('ShowLoginModal')
      }
    },
    // 发送消息给被连接的服务端
    send: function (params) {
      this.send(params)
    },
    close: function () {
      console.log("socket已经关闭")
    },
    //开始答题
    startAnswer(type) {
      this.startType = type
      // this.startState = true/
      let dataToEncrypt = {
        "message_todo_type": "todo_start_answering", // 开始答题
        "selected_option": 0, // 默认传0
        "question_type": this.startType //答题类型 1.生态 2.move语言
      }
      let data = {
        data: getEncrypt(dataToEncrypt)
      }
      console.log('send---', data)
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(data));
      } else {
        console.log('WebSocket is not connected.');
        this.reconnectOne()
      }
    },
    reconnectOne() {
      //重新连接
      console.log("重新连接");
      var that = this;
      //data中定义lockReconnect为false;
      if (that.lockReconnect) {
        return;
      }
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum);
      that.timeoutnum = setTimeout(function () {
        //新连接
        that.init();
        that.lockReconnect = false;
        console.log("重新连接");
      }, 10000);
    },
    // 分享
    shareFun() {
      // t.me/edenxxx_bot/edenx_text
      // window.Telegram.WebApp.openShare({
      //   link: "https://7157-36-143-138-103.ngrok-free.app?code=11",
      //   text: "Check out this cool link!"
      // });
      // ?code=' + this.userInfo.InviteCode
      // let url = 'https://7157-36-143-138-103.ngrok-free.app'
      // window.Telegram.WebApp.openTelegramLink(
      //   'https://t.me/share/url?url=https://t.me/catizenbot/gameapp?startapp=rp_1365932&text=%F0%9F%92%B0Catizen%3A%20Unleash%2C%20Play%2C%20Earn%20-%20Where%20Every%20Game%20Leads%20to%20an%20Airdrop%20Adventure!%0A%F0%9F%8E%81Let%27s%20play-to-earn%20airdrop%20right%20now!'
      // );
      // t.me/edenx_bot/edenxttt
      window.Telegram.WebApp.openTelegramLink(
        'https://t.me/share/url?url=https://t.me/EdenX_Mini_bot/EdenX?startapp=' + this.userInfo.InviteCode
      );
      // window.Telegram.WebApp.openLink(
      //   'https://t.me/share/url?url=https://b59c-183-199-228-224.ngrok-free.app?code=' + this.userInfo.InviteCode
      // );
    },
    returnFun() {
      this.tipsShow = false
      this.startState = false
      this.rightKey = null
      this.mineAnswer = null
      this.questionIndex = null
      this.nextShow = false
      this.explanationShow = false
      this.resultData = null
    }
  },
  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close
  }
}
</script>

<style lang="scss" scoped>
.home-box{
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/images/bg_01.png');
  background-size: 100% auto;
}
.home {
  width: 100%;
  height: 100vh;
  // background-image: url('@/assets/images/bg_01.png');
  // background-size: 100% auto;
  overflow-y: auto;
  padding-top: 38px;

  .home-header {
    margin: 0 30px;

    .home-header-edenx {
      font-size: 40px;
      flex: 1;
      -webkit-text-stroke: 8px transparent;
    }

    .home-header-list {
      text-align: center;
      height: 98px;
      position: relative;
      width: 130px;

      .home-header-list-img1 {
        width: 72px;
        height: auto;
      }

      .home-header-list-img2 {
        width: 100px;
        height: 98px;
      }

      .home-header-list-txt {
        font-size: 30px;
        -webkit-text-stroke: 6px transparent;
        width: 130px;
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 6px;
      }
    }
  }

  .home-point {
    margin: 36px 86px 0 86px;
    position: relative;
    height: 222px;
    transition: all 0.3s;

    .home-point-detail {
      width: 220px;
      height: 220px;
      background-image: url('@/assets/images/bg_02.png');
      background-size: 100% auto;
      text-align: center;
      padding-top: 60px;
      position: relative;
      z-index: 1;
      background-repeat: no-repeat;

      .home-point-detail-img {
        width: 30px;
        height: auto;
      }

      .home-point-num {
        font-size: 38px;
        -webkit-text-stroke: 6px transparent;
        margin-top: -10px;
        text-shadow: 2px 5px 0px rgba(0, 0, 0, 0.33);
      }

      .home-point-name {
        font-size: 22px;
        -webkit-text-stroke: 4px transparent;
        margin-top: -4px;
        text-shadow: 2px 5px 0px rgba(0, 0, 0, 0.33);
      }
    }

    .recharging {
      background-image: url('@/assets/images/bg_06.png');
      background-size: 100% auto;
      padding-top: 40px;

      .recharging-img {
        width: 36px;
        height: 73px;
        background-image: url('@/assets/images/recharging_bg01.png');
        background-size: 100% auto;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        background-repeat: no-repeat;

        img {
          width: 25px;
          height: 46px;
          margin: 4px;
          margin-left: 1px;
        }
      }

      .home-point-num2 {
        font-size: 26px;
      }

      .home-point-name {
        margin-top: 6px;
      }
    }

    .home-point-airship {
      width: 338px;
      height: 198px;
      margin-left: 10px;
      position: relative;
      z-index: 1;
      animation: airshipAnimation 10s ease-in-out infinite;
    }

    .home-point-bg {
      width: 211px;
      height: 108px;
      position: absolute;
      top: 80px;
      left: 160px;
    }
  }

  .home-point-hidden {
    height: 0px;
    overflow-y: hidden;
  }

  .rule {
    width: 690px;
    height: 1024px;
    margin: 40px 22px 0 auto;
    position: relative;
    transition: all 0.3s;

    .answer-box {
      overflow-y: auto;
      width: 690px;
      height: 1024px;
    }

    .rule_bg {
      position: absolute;
      left: 0;
      top: 40px;
      width: 690px;
      height: 1024px;
    }

    .rule-detail {
      width: 597px;
      margin: 0 auto 0 auto;
      position: relative;
      background: url('@/assets/images/detai_m.png');
      background-size: 100% auto;
      // background-position-y:100px;
      padding-bottom: 46px;
      margin-bottom: 80px;
      border-radius: 100px;
      position: sticky;
      left: 50px;
      top: 14px;
      z-index: 10;

      .rule-detail-title {
        text-align: center;
        font-size: 36px;
        padding-top: 50px;
        margin-bottom: 50px;
      }

      .rule-detail-content {
        font-size: 28px;
        color: #F0EFE6;
        line-height: 36px;
        width: 514px;
        margin: 0 auto 20px auto;
        max-height: 280px;
        overflow-y: auto;
      }
    }

    .rule-btn {
      width: 590px;
      height: 112px;
      position: relative;
      margin: 0 auto 40px auto;

      .rule-btn-name {
        text-align: center;
        line-height: 100px;
        font-size: 32px;
      }
    }

    .rule-btn-start {
      background-image: url('@/assets/images/bg_04.png');
      background-size: 100% auto;

      .rule-btn-icon {
        width: auto;
        height: 72px;
        position: absolute;
        top: 15px;
        right: 10px;
      }

      .rule-btn-icon2 {
        width: 48px;
        height: auto;
        right: 92px;
        top: 30px;
      }
    }

    .rule-btn-share {
      background-image: url('@/assets/images/bg_05.png');
      background-size: 100% auto;

      .rule-btn-icon {
        width: auto;
        height: 100px;
        position: absolute;
        top: 2px;
        right: 6px;
      }
    }

    .rule-btn-energy {
      background-image: url('@/assets/images/bg_08.png');
      background-size: 100% auto;

      .rule-btn-icon {
        width: auto;
        height: 72px;
        position: absolute;
        top: 20px;
        right: 0;
      }

      .rule-btn-icon2 {
        width: 48px;
        height: auto;
        right: 92px;
        top: 30px;
      }
    }

    .question {
      width: 100%;
      // height: 710px;
      margin-top: -40px;
      // overflow-y: auto;

      .question-list {
        width: 594px;
        min-height: 102px;
        position: relative;
        background-image: url('@/assets/images/answer/answer_bg2.png');
        background-size: 100% auto;
        border-radius: 50px;
        margin: 0 auto 20px auto;
        padding: 32px 0 32px 0;

        .question-list-top {
          width: 594px;
          height: 50px;
          position: absolute;
          top: 0;
          left: 0;
        }

        .question-list-bottom {
          width: 594px;
          height: 50px;
          position: absolute;
          bottom: -12px;
          left: 0;
        }

        .question-list-content {
          width: 442px;
          margin: 0 auto 0 50px;
          font-size: 32px;
          line-height: 40px;
        }

        .question-list-icon {
          width: 72px;
          height: auto;
          position: absolute;
          top: 14px;
          right: 16px;
        }
      }

      .rightStyle {
        background-image: url('@/assets/images/answer/right_bg2.png');

        // background-size: 100% auto;
        .question-list-content {
          color: #fff;
        }
      }

      .failStyle {
        background-image: url('@/assets/images/answer/fail_bg2.png');

        .question-list-content {
          color: #fff;
        }
      }
    }

    .zw {
      width: 100%;
      height: 200px;
    }
  }

  .rule-height {
    height: 1306px;

    .rule_bg {
      width: 670px;
      height: 1286px;
      background: #313748;
      box-shadow: 8px 12px 0px 3px rgba(0, 0, 0, 0.33);
      border-radius: 50px;
      border: 10px solid #4D556B;
    }

    .answer-box {
      height: 1286px;
    }
  }

  .bottom {
    width: 643px;
    height: 212px;
    // background: url('@/assets/images/answer/bg_1.png');
    // background-image: url('@/assets/images/answer/bg_1.png') 103 0 103 0 fill / 103px 1px stretch;

    border-image-source: url('@/assets/images/answer/bg_1.png');
    border-image-slice: 0 50% 0 53% fill;
    border-image-width: auto;


    // background-size: 100% auto;
    position: fixed;
    bottom: 100px;
    left: 54px;
    z-index: 20;
    transition: all 0.3s;

    .bottom-btn {
      display: flex;
      width: 643px;
      height: 212px;

      .bottom-detail {
        width: 430px;
        height: 120px;
        background: url('@/assets/images/answer/bg_3.png');
        background-size: 100% auto;
        font-size: 30px;
        text-align: center;
        line-height: 120px;
        margin: 30px 20px 0 30px;
      }

      .bottom-next {
        width: 120px;
        height: 120px;
        background: url('@/assets/images/answer/bg_2.png');
        background-size: 100% auto;
        font-size: 30px;
        text-align: center;
        line-height: 120px;
        margin-top: 30px;
      }
    }

    .bottom-title {
      font-size: 36px;
      padding-top: 2px;
      text-align: center;
    }

    .bottom-content {
      width: 514px;
      height: 565px;
      margin: 30px auto 0 auto;
      font-size: 30px;
      line-height: 37px;
      overflow-y: auto;
    }

    .bottom-close {
      width: 56px;
      height: auto;
      margin: -10px 10px 0 auto;
      display: block;
    }
  }

  .explanation {
    height: 880px;
    border-image-slice: 200 48% 200 50% fill;
  }
}

@keyframes airshipAnimation {
  from {
    transform: translate(0, 0px);
  }

  25% {
    transform: translate(10px, -5px);
  }

  50% {
    transform: translate(16px, -12px);
  }

  75% {
    transform: translate(6px, -8px);
  }

  to {
    transform: translate(0px, 0);
  }
}
</style>
