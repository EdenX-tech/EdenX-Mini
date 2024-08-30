import { Notification } from "element-ui";
import Store from '@/store'
// import { getToken } from "../utils/token";
var getToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE3MjM4ODQ5NjMsInVzZXJfaWQiOjQwfQ.-pxx3RaUSJ7QfJmjvDEnAABn09l5Eh8Y99DcNZ2qBs8'
 console.log('用户信息----')
 console.log(Store.state.userInfo)
var socket = null;//实例对象
var lockReconnect = false; //是否真正建立连接
var timeout = 20 * 1000; //20秒一次心跳
var timeoutObj = null; //心跳倒计时
var serverTimeoutObj = null; //服务心跳倒计时
var timeoutnum = null; //断开 重连倒计时
 
const initWebSocket = async () => {
  if ("WebSocket" in window) {
    // const wsUrl = 'ws://alpha.edenxminiapp.edenx.xyz/api/v1/ws';
    const wsUrl = 'wss://toolin.cn/echo';
    socket = new WebSocket(wsUrl);
    socket.onerror = webSocketOnError;
    socket.onmessage = webSocketOnMessage;
    socket.onclose = closeWebsocket;
    socket.onopen = openWebsocket;
  } else {
    Notification.error({
      title: "错误",
      message: "您的浏览器不支持websocket，请更换Chrome或者Firefox",
    });
  }
}
 
//建立连接
const openWebsocket = (e) => {
  start();
}
 
const start = ()=> {
  //开启心跳
  timeoutObj && clearTimeout(timeoutObj);
  serverTimeoutObj && clearTimeout(serverTimeoutObj);
  timeoutObj = setTimeout(function() {
    //这里发送一个心跳，后端收到后，返回一个心跳消息
    if (socket.readyState == 1) {
      //如果连接正常
      // socket.send("heartbeat");
    } else {
      //否则重连
      reconnect();
    }
    serverTimeoutObj = setTimeout(function() {
      //超时关闭
      socket.close();
    }, timeout);
  }, timeout);
}
 
//重新连接
const reconnect =() => { 
  if (lockReconnect) {
    return;
  }
  lockReconnect = true;
  //没连接上会一直重连，设置延迟避免请求过多
  timeoutnum && clearTimeout(timeoutnum);
  timeoutnum = setTimeout(function() {
    //新连接
    initWebSocket();
    lockReconnect = false;
  }, 1000);
}
 
//重置心跳
const reset =() => {
  //清除时间
  clearTimeout(timeoutObj);
  clearTimeout(serverTimeoutObj);
  //重启心跳
  start();
}
 
const sendWebsocket =(e) =>{
  // socket.send(`我发消息了`);
}
 
const webSocketOnError =(e) => {
  initWebSocket();
  reconnect();
  
}
 
//服务器返回的数据
const webSocketOnMessage=(e) => {
  //判断是否登录
  console.log('链接--',e)
//   if (getToken()) {
    //window自定义事件[下面有说明]
    window.dispatchEvent(
      new CustomEvent("onmessageWS", {
        detail: {
          data: JSON.parse(e?.data),
        },
      })
    );
//   }
  reset();
}
 
const closeWebsocket=(e) => {
  reconnect();
}
 
//断开连接
const close =() => {
//WebSocket对象也有发送和关闭的两个方法，只需要在自定义方法中分别调用send()和close()即可实现。
  socket.close();
}
//具体问题具体分析,把需要用到的方法暴露出去
export default { initWebSocket, sendWebsocket, webSocketOnMessage, close };