<template>
  <div class="open" :class="{'openHidden':show}" >
    <img class="open-img" src="@/assets/images/common/open.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'openView',
  props: {
    show: { type: Boolean, default: false },
  },
  data(){
    return{
      openShow:this.show
    }
  },
  watch: {
    show: {
      handler(newVal) {
        this.openShow = newVal
      },
    },
  },
  mounted(){

  },
  methods:{
    
  }
}
</script>
<style lang="scss" scoped>
.open{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  z-index: 19;
  .open-img{
    width: 100%;
    height: auto;
  }
}
.openHidden{
  animation: openAnimation 1.2s ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: 2.5s;
}


@keyframes openAnimation {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    z-index: -1;
  }
}
</style>


