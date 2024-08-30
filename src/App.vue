<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body,
div,
ul,
li,
input,
button,
img,
textarea,
p,
h1,
a {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  -webkit-tap-highlight-color: transparent; //禁用按压时有背景颜色
  box-sizing: border-box;
  font-family: 'Normal';
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #333;
}

img {
  font-size: 0;
  line-height: 0;
}

.flex {
  display: flex;
  align-items: center;
}

.cursor {
  cursor: pointer;
}

.text {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden; //溢出内容隐藏
  text-overflow: ellipsis; //文本溢出部分用省略号表示
  display: -webkit-box; //特别显示模式
  -webkit-line-clamp: 2; //行数
  line-clamp: 2;
  -webkit-box-orient: vertical; //盒子中内容竖直排列
}

.flex {
  display: flex;
  align-items: center;
}
.font{
  font-family:'MyFont';
}
.white{
  color: #fff;
}
.black{
  color: #000;
}
.stroke{
      background:#fff;
      -webkit-background-clip: text;
}

.detail-bg-top{
  width: 597px;
  height: 100px;
  position: absolute;
  top: 0px;
  left: 0;
}
.detail-bg-bottom{
  width: 597px;
  height: 100px;
  position: absolute;
  bottom: -10px;
  left: 0;
}
.detail-bg-icon{
  width: 130px;
  height: 124px;
  position: absolute;
  top: -54px;
  left: 29px;
}
.zindex1{
  position: relative;
  z-index: 1;
}
.layer{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
}
</style>
