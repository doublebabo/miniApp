import '@nutui/nutui-taro/dist/style.css'
import {
  Icon,
  Button,
  Toast,
  SearchBar,
  Form,
  FormItem,
  Cell,
  CellGroup,
  Popup,
  OverLay,
  Picker, Checkbox, CheckboxGroup, DatePicker, RadioGroup, Radio, Switch, Input, TextArea
} from '@nutui/nutui-taro'
import {App} from 'vue'

const setNutUi = (app: App) => {
  app.use(Icon).use(Button).use(Toast).use(SearchBar);
  app.use(Form);
  app.use(FormItem);
  app.use(Cell);
  app.use(CellGroup);
  app.use(CellGroup);
  app.use(Picker);
  app.use(Popup);
  app.use(OverLay);
  app.use(Checkbox);
  app.use(CheckboxGroup);
  app.use(DatePicker);
  app.use(Radio);
  app.use(RadioGroup);
  app.use(Switch);
  app.use(Input);
  app.use(TextArea);
}
export default setNutUi;