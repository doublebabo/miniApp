import { createApp } from 'vue'
import setNutUi from './nutui'
import './app.scss'
import './assets/iconfont.css';
import {encryptTool} from "./utils/encryptTool";
import Taro from "@tarojs/taro";

const App = createApp({
  onShow () {},
  mounted () {
    Taro.login().then(res => {
      console.log(res);
    });
    console.log(encryptTool('Admin123', 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCuD3zADixWMJNCs2GPkcbnNC4APUf8DjT7Dr3bR7VAD2dXwe8ubCckVQSPNHzfwTnwkzRQP2mxh8sGUkl+EBLm6AZzyjwAyWPeWCOMAAoOzzN7AyvGT02G3dm1j1QRow2z5M2/J2fhSnyRaRmVNB2XzUIhNRGLkJ813Q0yiTFdQwIDAQAB'))
  },

  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
setNutUi(App)
export default App;
