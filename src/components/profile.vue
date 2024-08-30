<template>
  <div v-if="userinfo" class="profile-view">
    <div v-show="show" class="layer"></div>
    <!-- <transition name="el-zoom-in-top"> -->
      <div v-show="show" class="profile">
        <img class="profile-close" @click="closeFun" src="@/assets/images/profile/close_icon.png" alt="">
        <p class="profile-title font white">Profile</p>
        <div class="profile-list">
          <img class="profile-list-recharging" src="@/assets/images/profile/recharging_icon.png" alt="">
          <p class="profile-list-title font white">My energy points</p>
          <p class="profile-list-num font white">{{ userinfo.Energy }}</p>
        </div>
        <div class="profile-list">
          <img class="profile-list-star" src="@/assets/images/cute_star.png" alt="">
          <p class="profile-list-title font white">My Points</p>
          <p class="profile-list-num font white">{{ userinfo.Points }}</p>
        </div>
        <div class="profile-invite">
          <div class="profile-invite-header flex">
            <img class="profile-invite-header-icon" src="@/assets/images/share_icon.png" alt="">
            <p class="profile-invite-header-title font white">Invited Friends List</p>
          </div>
          <div class="profile-invite-detail">
            <div v-if="list">
              <div v-for="(item, index) in list" :key="index" class="invite-list">
                <!-- <div class="invite-list-phone flex">
                  <img class="invite-list-userphone" src="@/assets/images/share_icon.png" alt="">
                  <img class="invite-list-bg" src="@/assets/images/profile/bg_05.png" alt="">
                </div> -->
                <p class="invite-list-name font black">{{ item.username }}</p>
                <img class="invite-list-recharging" src="@/assets/images/profile/recharging_icon.png" alt="">
                <p class="invite-list-num font">+{{ item.energies }}</p>
              </div>
            </div>
            <p class="profile-invite-msg">No more invitees at the moment.</p>
          </div>
        </div>
      </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import { getInviteList } from '@/api/user'
import { getEncrypt, getDecrypted } from "@/utils/encrypt";
export default {
  name: 'profile',
  props: {
    profileState: { type: Boolean, default: false },
  },
  data() {
    return {
      show: this.profileState,
      list: [],
      userinfo: null
    }
  },
  computed: {
    userInfo() {
      // 通过this.$store访问store
      return this.$store.state.userInfo;
    }
  },
  watch: {
    profileState: {
      handler(newVal) {
        this.show = newVal
        if (newVal) {
          this.getList()
        }
      },
    },
    userInfo: {
      handler(newVal) {
        this.userinfo = newVal
      },
    },
  },
  mounted() {

    // this.getList()
  },
  methods: {
    closeFun() {
      this.$emit("dialogClose")
    },
    getList() {
      var dataToEncrypt = {
        "page": 1,
        "per_page": 10
      }
      let encrypt = getEncrypt(dataToEncrypt)
      getInviteList(encodeURIComponent(encrypt)).then(res => {
        console.log('接口返回值--', JSON.parse(getDecrypted(res.data.data)))
        this.list = JSON.parse(getDecrypted(res.data.data))
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.profile-view {
  .profile {
    width: 690px;
    height: 1360px;
    background-image: url('@/assets/images/profile/bg_01.png');
    background-size: 100% auto;
    position: fixed;
    z-index: 20;
    left: 35px;
    top: 10vh;
    background-repeat: no-repeat;

    .profile-close {
      width: 56px;
      height: auto;
      margin: -10px 10px 0 auto;
      display: block;
    }

    .profile-title {
      text-align: center;
      font-size: 40px;
      margin-bottom: 20px;
    }

    .profile-list {
      width: 637px;
      height: 121px;
      background-image: url('@/assets/images/profile/bg_02.png');
      background-size: 100% auto;
      margin: 0 auto 14px 30px;
      display: flex;
      padding: 0 56px 0 40px;

      .profile-list-recharging {
        width: 39px;
        height: 63px;
        margin-top: 30px;
      }

      .profile-list-title {
        font-size: 28px;
        line-height: 36px;
        margin: 38px auto 0 20px;
        flex: 1;
      }

      .profile-list-num {
        font-size: 30px;
        margin-top: 16px;
        line-height: 78px;
      }

      .profile-list-star {
        width: 50px;
        height: 50px;
        margin-top: 30px;
      }
    }

    .profile-invite {
      width: 630px;
      height: 930px;
      background-image: url('@/assets/images/profile/bg_03.png');
      background-size: 100% auto;
      margin: 0 auto;
      padding-top: 30px;

      .profile-invite-header {
        margin: 0 50px;
        padding-bottom: 10px;

        .profile-invite-header-icon {
          width: 54px;
          height: auto;
        }

        .profile-invite-header-title {
          font-size: 28px;
          margin-left: 20px;
          flex: 1;
        }
      }

      .profile-invite-detail {
        width: 100%;
        height: 800px;
        overflow-y: auto;

        .invite-list {
          width: 574px;
          height: 114px;
          background-image: url('@/assets/images/profile/bg_04.png');
          background-size: 100% auto;
          padding: 0 40px;
          display: flex;
          margin: 10px 0 10px 30px;

          .invite-list-phone {
            position: relative;
            width: 58px;
            height: 60px;
            justify-content: center;
            margin-top: 22px;

            .invite-list-userphone {
              width: 58px;
              height: 58px;
              border-radius: 50%;
            }

            .invite-list-bg {
              width: 58px;
              height: 60px;
              position: absolute;
              top: 0;
              left: 0;
            }
          }

          .invite-list-name {
            flex: 1;
            margin-left: 10px;
            font-size: 28px;
            line-height: 36px;
            margin-top: 32px;
          }

          .invite-list-recharging {
            width: 27px;
            height: 44px;
            margin-top: 34px;
          }

          .invite-list-num {
            font-size: 26px;
            background: #000;
            -webkit-background-clip: text;
            -webkit-text-stroke: 4px transparent;
            color: #FFE600;
            margin-left: 4px;
            margin-top: 25px;
            line-height: 52px;
          }
        }

        .profile-invite-msg {
          font-size: 22px;
          color: #4B546A;
          text-align: center;
          margin-top: 40px;
          margin-bottom: 30px;
        }
      }
    }
  }
}
</style>
