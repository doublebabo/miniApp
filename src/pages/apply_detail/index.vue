<template>
  <view class="apply-detail">
    <scroll-view class="scroll-box"
                 :scroll-y="true"
                 :scroll-top="0">
      <nut-form class="form-container" :model-value="dynamicForm.state" ref="dynamicRefForm">
        <view class="form-title">到访信息</view>
        <nut-form-item class="tap-cell-box" label="来访事由" prop="visitReason.text" required :rules="[{ required: true, message: '请选择来访事由' }]">
          <view class="tap-cell" @click="() => canEdit && visitReasonPicker.onShow()">
            {{ dynamicForm.state.visitReason.text || '请选择' }}
            <nut-icon v-if="canEdit" class="tap-cell-icon" name="rect-right"></nut-icon>
          </view>
          <reason-pick
              ref="reasonPick"
              :options="visitReasonPicker.options"
              :confirm="visitReasonPicker.confirm"
              :title="'请选择来访事由'"
          />
        </nut-form-item>
        <nut-form-item class="tap-cell-box" label="来访园区" prop="visitArea.text" required :rules="[{ required: true, message: '请选择来访园区' }]">
          <view class="tap-cell" @click="() => canEdit && visitAreaPicker.onShow()">
            {{ dynamicForm.state.visitArea.text || '请选择' }}
            <nut-icon v-if="canEdit" class="tap-cell-icon" name="rect-right"></nut-icon>
          </view>
          <areas-pick
              ref="areasPick"
              :options="visitAreaPicker.options"
              :confirm="visitAreaPicker.confirm"
              :title="'请选择来访园区'"
          />
        </nut-form-item>
        <nut-form-item label="来访日期" prop="visitArea.text" required :rules="[{ required: true, message: '请选择来访园区' }]">
          <view class="date-select-box">
            <view class="date-select-box-date" @click="() => canEdit && visitDatePick.onShow(0)">
              {{ dynamicForm.state.visitDate[0] || '入园日期' }}
            </view>
            <text class="date-select-box-text">至</text>
            <view class="date-select-box-date" @click="() => canEdit && visitDatePick.onShow(1)">
              {{ dynamicForm.state.visitDate[1] || '离园日期' }}
            </view>
          </view>
          <nut-datepicker
              class="data-select-picker"
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
        <nut-form-item class="tap-cell-box" label="被拜访人" prop="visitWho.text" required :rules="[{ required: true, message: '请选择被拜访人' }]">
          <view class="tap-cell" @click="() => canEdit && visitWhoPicker.onShow()">
            {{ dynamicForm.state.visitWho.text || '请选择' }}
            <nut-icon v-if="canEdit" class="tap-cell-icon" name="rect-right"></nut-icon>
          </view>
          <search-pick
              ref="searchPick"
              :request="visitWhoPicker.request"
              :confirm="visitWhoPicker.confirm"
              :placeholder="'请输入被拜访人手机号/工号/姓名'"
          />
        </nut-form-item>
        <nut-form-item body-align="right" label="需要就餐" prop="needEating">
          <nut-switch class="switch-pick-btn" :disable="!canEdit" active-text="是" inactive-text="否"
                      active-color="rgb(57,181,74)"
                      v-model="dynamicForm.state.needEating"/>
        </nut-form-item>
        <nut-form-item body-align="right" label="开通网络权限" prop="wifiAccess">
          <nut-switch class="switch-pick-btn" :disable="!canEdit" active-text="是" inactive-text="否"
                      active-color="rgb(57,181,74)"
                      v-model="dynamicForm.state.wifiAccess"/>
        </nut-form-item>
        <nut-form-item class="textarea-remark-box" label="备注" prop="remark">
          <nut-input
              class="textarea-remark"
              v-model="dynamicForm.state.remark"
              type="textarea"
              show-word-limit
              max-length="50"
              :placeholder="getPlaceholder('请输入备注')"
              :readonly="!canEdit"
          />
        </nut-form-item>
        <template v-for="(i, index) in dynamicForm.state.visitors" :key="i.key">
          <view class="form-title">{{ index === 0 ? '来访人信息' : ('随行人' + index) }}
            <view v-if="canEdit && index !== 0" class="form-title-box-rt"
                  @click="() => dynamicForm.methods.remove(index)">
              <nut-icon font-class-name="iconfont" class-prefix="icon" name="minus"/>
              移除访客
            </view>
          </view>
          <nut-form-item label="手机号" :prop="'visitors.' + index + '.phoneNumber'" required
                         :rules="[{ required: true, message: '请输入手机号' }]">
            <nut-input class="nut-input-text" :readonly="!canEdit" v-model="i.phoneNumber" placeholder="请输入手机号"
                       type="text"/>
          </nut-form-item>
          <nut-form-item label="姓名" :prop="'visitors.' + index + '.name'" required
                         :rules="[{ required: true, message: '请输入姓名' }]">
            <nut-input class="nut-input-text" :readonly="!canEdit" v-model="i.name" placeholder="请输入姓名" type="text"/>
          </nut-form-item>
          <nut-form-item v-if="index === 0" label="工作单位" :prop="'visitors.' + index + '.company'"
                         :required="index === 0" :rules="[{ required: true, message: '请输入工作单位' }]">
            <nut-input class="nut-input-text" :readonly="!canEdit" v-model="i.company" placeholder="请输入工作单位"
                       type="text"/>
          </nut-form-item>
          <nut-form-item label="身份证号" :prop="'visitors.' + index + '.idCardNumber'" required
                         :rules="[{ required: true, message: '请输入身份证号' }]">
            <nut-input class="nut-input-text" :readonly="!canEdit" v-model="i.idCardNumber" placeholder="请输入身份证号"
                       type="text"/>
          </nut-form-item>
          <nut-form-item class="tap-cell-box" label="车牌号" :prop="'visitors.' + index + '.plateNumber'">
            <!--            <nut-input class="nut-input-text" :readonly="!canEdit" v-model="i.plateNumber" :placeholder="getPlaceholder('请输入车牌号')" type="text"/>-->
            <view class="tap-cell" @click="() => canEdit && plateNumberPick.onShow(index)">
              {{ dynamicForm.state.visitors[index].plateNumber || '请选择' }}
              <nut-icon v-if="canEdit" class="tap-cell-icon" name="rect-right"></nut-icon>
            </view>
          </nut-form-item>
          <nut-form-item :label-width="'calc(100vw - 143px)'">
            <template v-slot:label>
              <view class="label-container">
                <view class="label-title">照片</view>
                <view class="label-subtitle">点击上传高清人脸正面照，用于人脸通行，请注意背景色不能为白色，不要过度使用美颜</view>
              </view>
            </template>
            <nut-uploader :disabled="!canEdit" url="http://服务地址" :auto-upload="false" accept="image/*"
                          v-model:file-list="i.personPicFile" maximum="1" multiple>
            </nut-uploader>
          </nut-form-item>
          <nut-form-item :label-width="'calc(100vw - 143px)'">
            <template v-slot:label>
              <view class="label-container">
                <view class="label-title">健康码</view>
              </view>
            </template>
            <nut-uploader :disabled="!canEdit" url="http://服务地址" :auto-upload="false" accept="image/*"
                          v-model:file-list="i.healthPicFile" maximum="1" multiple>
            </nut-uploader>
          </nut-form-item>
          <nut-form-item :label-width="'calc(100vw - 143px)'">
            <template v-slot:label>
              <view class="label-container">
                <view class="label-title">行程码</view>
              </view>
            </template>
            <nut-uploader :disabled="!canEdit" url="http://服务地址" :auto-upload="false" accept="image/*"
                          v-model:file-list="i.travelPicFile" maximum="1" multiple>
            </nut-uploader>
          </nut-form-item>
          <nut-form-item :label-width="'calc(100vw - 143px)'" label="核酸报告">
            <template v-slot:label>
              <view class="label-container">
                <view class="label-title">核酸报告</view>
                <view class="label-subtitle">请上传48小时内核酸检测阴性报告</view>
              </view>
            </template>
            <nut-uploader :disabled="!canEdit" url="http://服务地址" :auto-upload="false" accept="image/*"
                          v-model:file-list="i.nucleicAcidReportFile" maximum="1" multiple>
            </nut-uploader>
          </nut-form-item>
        </template>
        <nut-cell v-if="canEdit" class="add-cell" @click="dynamicForm.methods.add">
          <nut-icon font-class-name="iconfont" class-prefix="icon" name="add"/>
          添加随行人员
        </nut-cell>
        <plate-number-pick
            :visible="plateNumberPick.show"
            :confirm="plateNumberPick.confirm"
            :close="plateNumberPick.onShow"
            :values="dynamicForm.state.visitors[plateNumberPick.index].plateNumber"
        />
      </nut-form>
      <view v-if="canEdit" class='confirm-btn'>
        <nut-button block shape="square" color="rgb(183,165,104)" @click="dynamicForm.methods.submit()">提交</nut-button>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, reactive, ref} from "vue";
import AreasPick from "./areas-pick.vue";
import ReasonPick from "./reason-pick.vue";
import SearchPick from "./search-pick.vue";
import Taro from "@tarojs/taro";
import PlateNumberPick from "./plate-number-pick.vue";

const $instance = Taro.getCurrentInstance();
const canEdit = ref(true);
const reasonPick = ref()
const areasPick = ref()
const searchPick = ref()

onBeforeMount(() => {
  if ($instance.router?.params.id) {
    canEdit.value = false;
  }
});

function getPlaceholder(text) {
  return canEdit.value && text || '';
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
    }),
    visitors: [{
      key: 1,
      phoneNumber: '',
      name: '',
      company: '',
      idCardNumber: '',
      plateNumber: '',
      personPicFile: [],
      healthPicFile: [],
      travelPicFile: [],
      nucleicAcidReportFile: [],
    }]
  }),

  methods: {
    submit() {
      dynamicRefForm.value.validate().then(({valid, errors}) => {
        if (valid) {
          console.log('success', dynamicForm);
        } else {
          console.log('error submit!!', errors);
          Taro.showToast({
            title: errors[0].message,
            icon: 'none',
            duration: 1000,
          });
        }
      });
    },
    reset() {
      dynamicRefForm.value.reset();
    },
    remove(index) {
      dynamicForm.state.visitors.splice(index, 1);
    },
    add() {
      // let newIndex = dynamicForm.state.tels.length;
      dynamicForm.state.visitors.push({
        key: Date.now(),
        phoneNumber: '',
        name: '',
        company: '',
        idCardNumber: '',
        plateNumber: '',
        personPicFile: [],
        healthPicFile: [],
        travelPicFile: [],
        nucleicAcidReportFile: [],
      });
    }
  }
};

const visitReasonPicker = reactive({
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
    reasonPick.value.onShow();
  },
  confirm(selectedOption) {
    reasonPick.value.onClose();
    dynamicForm.state.visitReason.value = selectedOption.value;
    dynamicForm.state.visitReason.text = selectedOption.text;
  },
})


const visitAreaPicker = reactive({
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
    areasPick.value.onShow();
  },
  confirm(selectedOptions) {
    areasPick.value.onClose();
    dynamicForm.state.visitArea.value = selectedOptions?.map(o => o.value)?.join(',');
    dynamicForm.state.visitArea.text = selectedOptions?.map(o => o.name)?.join(',');
  },
});

const currentDateValue = computed(() => {
  const v = dynamicForm.state.visitDate[visitDatePick.currenDateIndex];
  return v && new Date(v) || null;
});

const visitDatePick = reactive({
  show: ref(false),
  currenDateIndex: ref(0),
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
  request(params) {
    return Promise.resolve({
      data: [
        {text: '张三', value: 1},
        {text: '张三1', value: 2},
        {text: '张三2', value: 3},
        {text: '张三3', value: 4},
        {text: '张三4', value: 5},
        {text: '张三5', value: 6},
        {text: '张三6', value: 7},
        {text: '张三7', value: 8},
      ]
    })
  },
  onShow() {
    searchPick.value.onShow();
  },
  confirm(selectedOptions) {
    searchPick.value.onClose();
    dynamicForm.state.visitWho.value = selectedOptions.value;
    dynamicForm.state.visitWho.text = selectedOptions.text;
  },
})

const plateNumberPick = reactive({
  show: ref(false),
  index: ref(0),
  onShow(index) {
    if (!isNaN(index)) plateNumberPick.index = index;
    plateNumberPick.show = !plateNumberPick.show;
  },
  confirm(val) {
    plateNumberPick.show = false;
    dynamicForm.state.visitors[plateNumberPick.index].plateNumber = val;
  },
})

</script>

<style lang="scss">
.apply-detail {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: rgb(247, 247, 247);

  .scroll-box {
    padding-bottom: 68px;
  }

  .form-container {
    background: #fff;

    .nut-cell-group__warp {
      border-radius: 0;
      margin-top: 0;
    }

    .nut-form-item {
      position: relative;

      .nut-form-item__body__tips {
        position: absolute;
        left: 18px;
        top: 27px;
      }
    }
  }

  .form-title-box-rt {
    float: right;
    color: rgb(183, 165, 104);
    margin-right: 16px;
    font-weight: normal;
    display: flex;
    justify-content: center;
  }

  .form-title {
    padding: 8px 0 8px 20px;
    font-weight: bold;
    border-left: 3px solid rgb(192, 163, 83);
    background: rgb(247, 247, 247);
  }


  .tap-cell-box {
    display: flex;
    align-items: center;
    padding: 0 16Px;
    .tap-cell {
      color: rgb(128, 128, 128);
      position: relative;
      padding: 13Px;
      padding-right: 20px;
      text-align: right;
      .tap-cell-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
      }
    }
  }



  .add-cell {
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: rgb(183, 165, 104);
  }

  .label-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    .label-subtitle {
      color: rgb(122, 122, 122);
      font-size: 12px;
    }
  }

  .nut-form-item__label {
    position: relative;
    color: #000;
    font-size: 15px;
  }

  .nut-input-text {
    .input-text {
      text-align: right !important;
      width: 100%;
      color: rgb(128, 128, 128);
    }
  }

  .switch-pick-btn {
    padding: 0 5px;
  }
  
  .switch-pick-btn.nut-switch.switch-close {
    background-color: #8799a3;
  }

  .data-select-picker {
    .nut-picker__title {
      font-weight: bold;
    }

    .nut-picker-roller-item-tarotile {
      font-weight: bold;
      font-size: 15px;
    }
  }

  .date-select-box {
    display: flex;
    float: right;
    color: rgb(128, 128, 128);
    padding-right: 20px;

    .date-select-box-text {
      margin: 0 20px;
    }
  }

  .date-select-btn {
    color: rgb(183, 165, 104);
    border: none;
    border-top: 5px solid rgb(247, 247, 247);
    letter-spacing: 5px;
    font-size: 16px;
    height: 74px;
    padding-bottom: 20px;
  }

  .textarea-remark-box {
    display: flex;
    flex-direction: column;

    .textarea-remark {
      background: rgb(247, 247, 247);
      border-radius: 10px;
      padding: 10px;
      margin: 8px 0 5px 0;
      border: 0;

      textarea {
        width: 100%;
        color: rgb(128, 128, 128);
        height: 50px;
      }
    }
  }

  .confirm-btn {
    z-index: 1;
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: 10px 24px 20px 24px;
    background: rgb(241, 241, 241);
    box-sizing: border-box;

    button {
      border-radius: 7px;
    }
  }
}
</style>