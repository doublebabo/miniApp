import { createApp } from 'vue'
import setNutUi from './nutui'
import './app.scss'
import './assets/iconfont.css';

const App = createApp({
  onShow () {},
  mounted () {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
setNutUi(App)
export default App;
