<template>
  <view class="apply-detail">
    <nut-form class="form-container"  :model-value="dynamicForm.state" ref="dynamicRefForm">
      <view class="form-title">到访信息</view>
      <nut-form-item label="来访事由" prop="visitReason.text" required :rules="[{ required: true, message: '请选择来访事由' }]">
        <view class="tap-cell" @click="visitReasonPicker.onShow">
          {{dynamicForm.state.visitReason.text || '请选择'}}
          <nut-icon class="tap-cell-icon" name="rect-right"></nut-icon>
        </view>
        <reason-pick
            :visible="visitReasonPicker.show"
            :options="visitReasonPicker.options"
            :confirm="visitReasonPicker.confirm"
            :close="visitReasonPicker.onShow"
            :title="'请选择来访事由'"
        />
      </nut-form-item>
      <nut-form-item label="来访园区" prop="visitArea.text" required :rules="[{ required: true, message: '请选择来访园区' }]">
        <view class="tap-cell" @click="visitAreaPicker.onShow">
          {{dynamicForm.state.visitArea.text || '请选择'}}
          <nut-icon class="tap-cell-icon" name="rect-right"></nut-icon>
        </view>
        <areas-pick
          :visible="visitAreaPicker.show"
          :options="visitAreaPicker.options"
          :confirm="visitAreaPicker.confirm"
          :close="visitAreaPicker.onShow"
          :title="'请选择来访园区'"
        />
      </nut-form-item>
      <nut-form-item label="来访日期" prop="visitArea.text" required :rules="[{ required: true, message: '请选择来访园区' }]">
        <view class="date-select-box">
          <view class="date-select-box-date" @click="() => visitDatePick.onShow(0)">{{dynamicForm.state.visitDate[0] || '入园日期'}}</view>
          <text class="date-select-box-text">至</text>
          <view class="date-select-box-date" @click="() => visitDatePick.onShow(1)">{{dynamicForm.state.visitDate[1] || '离园日期'}}</view>
        </view>
        <nut-datepicker
            v-model="currentDateValue"
            :title="visitDatePick.title[visitDatePick.currenDateIndex]"
            type="date"
            :min-date="visitDatePick.minDate"
            :max-date="visitDatePick.maxDate"
            @change="visitDatePick.change"
            cancel-text=" "
            ok-text=" "
            v-model:visible="visitDatePick.show"
        >
          <nut-button class="date-select-btn" block shape="square" @click="visitDatePick.confirm">确定</nut-button>
        </nut-datepicker>
      </nut-form-item>
      <nut-form-item label="被拜访人" prop="visitWho.text" required :rules="[{ required: true, message: '请选择被拜访人' }]">
        <view class="tap-cell" @click="visitWhoPicker.onShow">
          {{dynamicForm.state.visitWho.text || '请选择'}}
          <nut-icon class="tap-cell-icon" name="rect-right"></nut-icon>
        </view>
        <search-pick
            :visible="visitWhoPicker.show"
            :request="visitWhoPicker.request"
            :confirm="visitWhoPicker.confirm"
            :close="visitWhoPicker.onShow"
            :placeholder="'请输入被拜访人手机号/工号/姓名'"
        />
      </nut-form-item>
      <nut-form-item body-align="right" label="需要就餐" prop="needEating">
        <nut-switch active-text="是" inactive-text="否" v-model="dynamicForm.state.needEating" />
      </nut-form-item>
      <nut-form-item body-align="right" label="开通网络权限" prop="wifiAccess">
        <nut-switch active-text="是" inactive-text="否" v-model="dynamicForm.state.wifiAccess" />
      </nut-form-item>
      <nut-form-item class="textarea-remark-box" label="备注" prop="remark">
        <nut-input
            class="textarea-remark"
            v-model="dynamicForm.state.remark"
            type="textarea"
            show-word-limit
            max-length="50"
            placeholder="请输入留言"
        />
      </nut-form-item>
      <view class="form-title">来访人信息</view>
      <nut-cell>
        <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.add">添加</nut-button>
        <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.remove">删除</nut-button>
        <nut-button type="primary" style="margin-right: 10px" size="small" @click="dynamicForm.methods.submit">提交</nut-button>
        <nut-button size="small" @click="dynamicForm.methods.reset">重置提示状态</nut-button>
      </nut-cell>
    </nut-form>
    <view class='confirm-btn'>
      <nut-button block  color="rgb(183,165,104)" @click="onSubmit">提交</nut-button>
    </view>
  </view>
</template>

<script setup  lang="ts">
import {computed, reactive, ref} from "vue";
import {Toast} from "@nutui/nutui-taro";
import AreasPick from "./areas-pick.vue";
import ReasonPick from "./reason-pick.vue";
import SearchPick from "./search-pick.vue";

function onSubmit() {

}

const dynamicRefForm = ref<any>(null);
const dynamicForm = {
  state: reactive({
    name: '',
    visitReason: {
      text: '',
      value: ''
    },
    visitArea: {
      text: '',
      value: ''
    },
    visitWho: {
      text: '',
      value: ''
    },
    needEating: false,
    wifiAccess: false,
    remark: '',
    visitDate: new Array(2),
    tels: new Array({
      key: 1,
      value: ''
    })
  }),

  methods: {
    submit() {
      dynamicRefForm.value.validate().then(({ valid, errors }) => {
        if (valid) {
          console.log('success', dynamicForm);
        } else {
          Toast.warn(errors[0].message);
          console.log('error submit!!', errors);
        }
      });
    },
    reset() {
      dynamicRefForm.value.reset();
    },
    remove() {
      dynamicForm.state.tels.splice(dynamicForm.state.tels.length - 1, 1);
    },
    add() {
      let newIndex = dynamicForm.state.tels.length;
      dynamicForm.state.tels.push({
        key: Date.now(),
        value: ''
      });
    }
  }
};

const visitReasonPicker = reactive({
  show: false,
  options: [
    {text: '商务交流', value: 1},
    {text: '商务交流2', value: 2},
    {text: '商务交流3', value: 3},
    {text: '商务交流4', value: 4},
    {text: '商务交流4', value: 4},
    {text: '商务交流4', value: 4},
    {text: '商务交流4', value: 4},
    {text: '商务交流4', value: 4},
    {text: '商务交流4', value: 4},
    {text: '商务交流4', value: 4},
    {text: '商务交流4', value: 4},
  ],
  onShow() {
    visitReasonPicker.show = !visitReasonPicker.show;
  },
  confirm(selectedOption) {
    visitReasonPicker.show = false;
    dynamicForm.state.visitReason.value = selectedOption.value;
    dynamicForm.state.visitReason.text = selectedOption.text;
  },
})


const visitAreaPicker = reactive({
  show: false,
  options: [
    {name: '名字名字名字名字名字名字字', value: 1, address: '地址地地址地址地址地址地址地址地址地址'},
    {name: '名字名字名字名字名字名字名字名字名字名字名字名字1', value: 2, address: '地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址1'},
    {name: '名字名字名字名字名字名字名字名字名字名字名字名字2', value: 3, address: '地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址2'},
    {name: '名字名字名字名字名字名字名字名字名字名字名字名字3', value: 4, address: '地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址3'},
    {name: '名字名字名字名字名字名字名字名字名字名字名字名字4', value: 5, address: '地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址4'},
    {name: '名字名字名字名字名字名字名字名字名字名字名字名字5', value: 6, address: '地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址5'},
    {name: '名字名字名字名字名字名字名字名字名字名字名字名字6', value: 7, address: '地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址6'},
  ],
  onShow() {
    visitAreaPicker.show = !visitAreaPicker.show;
  },
  confirm(selectedOptions) {
    visitAreaPicker.show = false;
    dynamicForm.state.visitArea.value = selectedOptions?.map(o => o.value)?.join(',');
    dynamicForm.state.visitArea.text = selectedOptions?.map(o => o.name)?.join(',');
  },
});

const currentDateValue = computed(() => {
  const v = dynamicForm.state.visitDate[visitDatePick.currenDateIndex];
  return v && new Date(v) || null;
});

const visitDatePick = reactive({
  show: false,
  currenDateIndex: 0,
  minDate: new Date(),
  maxDate: new Date('2099-12-31'),
  title: ['请选择入园日期（年/月/日）', '请选择出园日期（年/月/日）'],
  values: new Array(2),
  onShow(index) {
    visitDatePick.currenDateIndex = index;
    visitDatePick.show = !visitDatePick.show;
    if (index === 0) {
      visitDatePick.minDate = new Date();
      visitDatePick.maxDate = dynamicForm.state.visitDate[1] && new Date(dynamicForm.state.visitDate[1]) || new Date('2099-12-31');
    } else {
      visitDatePick.maxDate = new Date('2099-12-31');
      visitDatePick.minDate = dynamicForm.state.visitDate[0] && new Date(dynamicForm.state.visitDate[0]) || new Date();
    }
  },
  change({columnIndex, selectedValue, selectedOptions}) {
    console.log(selectedOptions.map((option) => option.text).join(''))
    visitDatePick.values[visitDatePick.currenDateIndex] = selectedOptions.map((option) => option.text).join('-');
  },
  confirm() {
    const index = visitDatePick.currenDateIndex;
    let v = visitDatePick.values[index];
    if (!v) {
      let date;
      if (index === 0) {
        date = new Date();
      } else {
        date = dynamicForm.state.visitDate[0] && new Date(dynamicForm.state.visitDate[0]) || new Date();
      }
      v = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    dynamicForm.state.visitDate[index] = v;
    visitDatePick.show = false;
  },
});

const visitWhoPicker = reactive({
  show: false,
  request(params) {
    return Promise.resolve({data: [
        {text: '张三', value: 1},
        {text: '张三1', value: 2},
        {text: '张三2', value: 3},
        {text: '张三3', value: 4},
        {text: '张三4', value: 5},
        {text: '张三5', value: 6},
        {text: '张三6', value: 7},
        {text: '张三7', value: 8},
      ]})
  },
  onShow() {
    visitWhoPicker.show = !visitWhoPicker.show;
  },
  confirm(selectedOptions) {
    visitWhoPicker.show = false;
    dynamicForm.state.visitWho.value = selectedOptions.value;
    dynamicForm.state.visitWho.text = selectedOptions.text;
  },
})

</script>

<style lang="scss">
.apply-detail {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: rgb(247,247,247);
  .form-container {
    background: #fff;
    .nut-form-item {
      position: relative;
      .nut-form-item__body__tips {
        position: absolute;
        left: 18px;
        top: 27px;
      }
    }
  }
  .form-title {
    padding: 8px 0 8px 20px;
    font-weight: bold;
    border-left: 3px solid rgb(192,163,83);
    background: rgb(247,247,247);
  }
  .tap-cell {
    //text-align: right;
    display: flex;
    justify-content: right;
    color: rgb(102,102,102);
    position: relative;
    padding-right: 20px;
    .tap-cell-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
  }
  .date-select-box {
    display: flex;
    //float: left;
    color: rgb(102,102,102);
    padding-right: 20px;
    .date-select-box-text {
      margin: 0 20px;
    }
  }
  .date-select-btn {
    color: rgb(183,165,104);
    border: none;
    border-top: 5px solid rgb(247,247,247);
    height: 54px;
    letter-spacing: 5px;
    font-size: 16px;
  }
  .textarea-remark-box{
    display: flex;
    flex-direction: column;
    .textarea-remark {
      background: rgb(247,247,247);
      border-radius: 10px;
      padding: 10px;
      margin: 8px 0 5px 0;
      border: 0;
      textarea {
        width: 100%;
        color: #000;
        height: 50px;
      }
    }
  }

  .confirm-btn {
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: 10px 30px;
    box-sizing: border-box;
  }
}
</style>