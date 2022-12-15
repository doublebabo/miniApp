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
    console.log(encryptTool('Admin123', 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6wUs91W9zCvZnh264RZ/TWvJFGIXDl05vEx893zGpsQER6R3pIGJ26V5yx8gbDoNbW2qPjiNLSoRRNrStl89ESrQj+62MKaNq6RYRtqA5xb76IipM5Xso7N//c8F4sQvn+tfSlY7w7/zOOzLMHXQ3jS7+36dtgRFrTtLzxkYY9QIDAQAB'))
  },

  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
setNutUi(App)
export default App;
