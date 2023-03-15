<template>
  <view class="apply-detail">
    <scroll-view class="scroll-box"
                 :scroll-y="true"
                 :scroll-top="0">
      <nut-form class="form-container" :model-value="dynamicForm.state" ref="dynamicRefForm">
        <view class="form-title">到访信息</view>
        <nut-form-item label="来访事由" prop="v_reason" body-align="right" required
                       :rules="[{ required: true, message: '请输入来访事由' }]">
          <input class="nut-input-text" v-model="dynamicForm.state.v_reason" :readonly="!canEdit"
                 :placeholder="getPlaceholder('请输入来访事由')" type="text"/>
        </nut-form-item>
        <nut-form-item class="tap-cell-box" label="访客类型" prop="secondVisitorType.text" body-align="right" required
                       :rules="[{ required: true, message: '请输入访客类型' }]">
          <view class="tap-cell" @click="() => canEdit && secondVisitorTypePicker.onShow()">
            {{ dynamicForm.state.secondVisitorType.text || '请选择' }}
            <nut-icon v-if="canEdit" class="tap-cell-icon" name="rect-right"></nut-icon>
          </view>
          <reason-pick
              ref="secondVisitorTypePick"
              :options="secondVisitorTypePicker.options"
              :confirm="secondVisitorTypePicker.confirm"
              :title="'请选择访客类型'"
          />
        </nut-form-item>
        <!--        <nut-form-item class="tap-cell-box" label="来访园区" prop="visitArea.text" required :rules="[{ required: true, message: '请选择来访园区' }]">-->
        <!--          <view class="tap-cell" @click="() => canEdit && visitAreaPicker.onShow()">-->
        <!--            {{ dynamicForm.state.visitArea.text || '请选择' }}-->
        <!--            <nut-icon v-if="canEdit" class="tap-cell-icon" name="rect-right"></nut-icon>-->
        <!--          </view>-->
        <!--          <areas-pick-->
        <!--              ref="areasPick"-->
        <!--              :options="visitAreaPicker.options"-->
        <!--              :confirm="visitAreaPicker.confirm"-->
        <!--              :title="'请选择来访园区'"-->
        <!--          />-->
        <!--        </nut-form-item>-->
        <nut-form-item class="tap-cell-box" label="来访时间" prop="v_timeStr" required
                       :rules="[{ required: true, message: '请选择来访时间' }]">
          <view class="tap-cell" @click="() => canEdit && visitDatePick.onShow(0)">
            {{ dynamicForm.state.v_timeStr || '请选择来访时间' }}
            <nut-icon v-if="canEdit" class="tap-cell-icon" name="rect-right"></nut-icon>
          </view>
        </nut-form-item>
        <nut-form-item class="tap-cell-box" label="离访时间" prop="v_lvTimeStr" required
                       :rules="[{ required: true, message: '请选择离访时间' }]">
          <view class="tap-cell" @click="() => canEdit && visitDatePick.onShow(1)">
            {{ dynamicForm.state.v_lvTimeStr || '请选择离访时间' }}
            <nut-icon v-if="canEdit" class="tap-cell-icon" name="rect-right"></nut-icon>
          </view>
        </nut-form-item>
        <nut-form-item class="tap-cell-box" label="被拜访人" prop="isv_id.text" required
                       :rules="[{ required: true, message: '请选择被拜访人' }]">
          <view class="tap-cell" @click="() => canEdit && visitWhoPicker.onShow()">
            {{ dynamicForm.state.isv_id.text || '请选择' }}
            <nut-icon v-if="canEdit" class="tap-cell-icon" name="rect-right"></nut-icon>
          </view>
          <search-pick
              ref="searchPick"
              :request="visitWhoPicker.request"
              :confirm="visitWhoPicker.confirm"
              :placeholder="'请输入被拜访人手机号/工号/姓名'"
          />
        </nut-form-item>
        <nut-form-item class="textarea-remark-box" label="备注" prop="memo">
          <nut-input
              class="textarea-remark"
              v-model="dynamicForm.state.memo"
              type="textarea"
              show-word-limit
              max-length="50"
              :placeholder="getPlaceholder('请输入备注')"
              :readonly="!canEdit"
          />
        </nut-form-item>
        <template v-for="(i, index) in dynamicForm.state.followVisitors" :key="i.key">
          <view class="form-title">{{ index === 0 ? '来访人信息' : ('随行人' + index) }}
            <view v-if="canEdit && index !== 0" class="form-title-box-rt"
                  @click="() => dynamicForm.methods.remove(index)">
              <nut-icon class="minus-icon" font-class-name="iconfont" class-prefix="icon" name="minus"/>
              移除访客
            </view>
          </view>
          <nut-form-item label="手机号" :prop="'followVisitors.' + index + '.v_phone'" required
                         :rules="[{ required: true, message: '请输入手机号' }]">
            <nut-input class="nut-input-text" :readonly="!canEdit" v-model="i.v_phone" placeholder="请输入手机号"
                       type="text"/>
          </nut-form-item>
          <nut-form-item label="姓名" :prop="'followVisitors.' + index + '.v_name'" required
                         :rules="[{ required: true, message: '请输入姓名' }]">
            <nut-input class="nut-input-text" :readonly="!canEdit" v-model="i.v_name" placeholder="请输入姓名" type="text"/>
          </nut-form-item>
          <nut-form-item v-if="index === 0" label="工作单位" :prop="'followVisitors.' + index + '.v_dw'"
                         :required="index === 0" :rules="[{ required: true, message: '请输入工作单位' }]">
            <nut-input class="nut-input-text" :readonly="!canEdit" v-model="i.v_dw" placeholder="请输入工作单位"
                       type="text"/>
          </nut-form-item>
          <nut-form-item label="身份证号" :prop="'followVisitors.' + index + '.v_certificateNumber'" required
                         :rules="[{ required: true, message: '请输入身份证号' }]">
            <nut-input class="nut-input-text" :readonly="!canEdit" v-model="i.v_certificateNumber" placeholder="请输入身份证号"
                       type="text"/>
          </nut-form-item>
          <nut-form-item class="tap-cell-box" label="车牌号" :prop="'followVisitors.' + index + '.v_plateNumber'">
            <!--            <nut-input class="nut-input-text" :readonly="!canEdit" v-model="i.plateNumber" :placeholder="getPlaceholder('请输入车牌号')" type="text"/>-->
            <view class="tap-cell" @click="() => canEdit && plateNumberPick.onShow(index)">
              {{ dynamicForm.state.followVisitors[index].v_plateNumber || '请选择' }}
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
                          v-model:file-list="i.faceFile" maximum="1" multiple>
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
            :values="dynamicForm.state.followVisitors[plateNumberPick.index].v_plateNumber"
        />
        <nut-datepicker
            class="data-select-picker"
            v-model="currentDateValue"
            :title="visitDatePick.title[visitDatePick.currenDateIndex]"
            type="datetime"
            :min-date="visitDatePick.minDate"
            :max-date="visitDatePick.maxDate"
            @change="visitDatePick.change"
            cancel-text=" "
            ok-text=" "
            v-model:visible="visitDatePick.show"
            :formatter="visitDatePick.formatter"
        >
          <nut-button class="date-select-btn" block shape="square" @click="visitDatePick.confirm">确定</nut-button>
        </nut-datepicker>
      </nut-form>
      <view v-if="canEdit" class='confirm-btn'>
        <button class="btn-max-w btn" type="primary" @click="dynamicForm.methods.submit()">提交</button>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">

import {computed,  onMounted, reactive, ref} from "vue";
import ReasonPick from "./reason-pick.vue";
import SearchPick from "./search-pick.vue";
import Taro from "@tarojs/taro";
import PlateNumberPick from "./plate-number-pick.vue";
import request from "../../utils/request";

const canEdit = ref(true);
const searchPick = ref()
const secondVisitorTypePick = ref()


onMounted(async () => {
  const visitorTypes = await request.post('/evo-apigw/evo-visitor/1.0.0/visitor-type/page', {
    "pageSize": 10000,
    "pageNum": 1
  });
  secondVisitorTypePicker.options = visitorTypes?.data?.pageData?.map(o => ({text: o.typeName, value: o.id})) || [];
});

function getPlaceholder(text) {
  return canEdit.value && text || '';
}

const dynamicRefForm = ref<any>(null);
const dynamicForm = {
  state: reactive({
    v_reason: '',
    v_timeStr: '',
    v_lvTimeStr: '',
    secondVisitorType: {
      text: '',
      value: ''
    },
    memo: '',
    visitorType: 2,
    userId: 0,
    isv_id: {
      text: '',
      value: ''
    },
    followVisitors: [{
      key: 1,
      v_phone: '',
      v_name: '',
      v_dw: '',
      v_certificateNumber: '',
      v_plateNumber: '',
      faceFile: [],
    }]
  }),

  methods: {
    submit() {
      Taro.redirectTo({
        url: `/pages/finish/index`,
      })
      dynamicRefForm.value.validate().then(({valid, errors}) => {
        console.log('dynamicForm.state', dynamicForm.state);
        if (valid) {
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
      dynamicForm.state.followVisitors.splice(index, 1);
    },
    add() {
      // let newIndex = dynamicForm.state.tels.length;
      dynamicForm.state.followVisitors.push({
        key: Date.now(),
        v_phone: '',
        v_name: '',
        v_dw: '',
        v_certificateNumber: '',
        v_plateNumber: '',
        faceFile: [],
      });
    }
  }
};


const currentDateValue = computed(() => {
  let v;
  if (visitDatePick.currenDateIndex === 0) {
    v = dynamicForm.state.v_timeStr || visitDatePick.minDate;
  } else {
    v = dynamicForm.state.v_lvTimeStr || dynamicForm.state.v_timeStr || visitDatePick.minDate;
  }
  return new Date(v);
});

function formatDate(data) {
  return data.replace(/-/g, '/');
  // return data;
}

const visitDatePick = reactive({
  show: false,
  currenDateIndex: 0,
  minDate: new Date(),
  maxDate: new Date('2099/12/31 23:59:00'),
  title: ['请选择来访时间', '请选择离访时间'],
  values: new Array(2),
  formatter: (type: string, option) => {
    switch (type) {
      case 'year':
        option.text += '年';
        break;
      case 'month':
        option.text += '月';
        break;
      case 'day':
        option.text += '日';
        break;
      case 'hour':
        option.text += '时';
        break;
      case 'minute':
        option.text += '分';
        break;
      default:
        option.text += '';
    }
    return option;
  },
  onShow(index) {
    visitDatePick.currenDateIndex = index;
    visitDatePick.show = !visitDatePick.show;
    if (index === 0) {
      visitDatePick.minDate = new Date();
      visitDatePick.maxDate = dynamicForm.state.v_lvTimeStr && new Date(dynamicForm.state.v_lvTimeStr) || new Date('2099/12/31 23:59:00');
    } else {
      visitDatePick.maxDate = new Date('2099/12/31 23:59:00');
      visitDatePick.minDate = dynamicForm.state.v_timeStr && new Date(dynamicForm.state.v_timeStr) || new Date();
    }
  },
  change({columnIndex, selectedValue, selectedOptions}) {
    visitDatePick.values[visitDatePick.currenDateIndex] = selectedOptions.map((option) => option.text).join('-');
  },
  confirm() {
    const index = visitDatePick.currenDateIndex;
    let v = visitDatePick.values[index];
    if (v) {
      v = v.split('-').map(o => o.slice(0, -1));
      v = `${v[0]}/${v[1]}/${v[2]} ${v[3]}:${v[4]}:00`;
    } else {
      let date;
      if (index === 0) {
        date = new Date();
      } else {
        date = dynamicForm.state.v_timeStr && new Date(dynamicForm.state.v_timeStr) || new Date();
      }

      const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
      const d = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
      const hours = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
      const mins = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
      v = `${date.getFullYear()}/${month}/${d} ${hours}:${mins}:00`;
    }
    if (index === 0) {
      dynamicForm.state.v_timeStr = v;
    } else {
      dynamicForm.state.v_lvTimeStr = v;
    }
    visitDatePick.show = false;
  },
});

const secondVisitorTypePicker = reactive({
  options: [],
  onShow() {
    secondVisitorTypePick.value.onShow();
  },
  confirm(selectedOptions) {
    secondVisitorTypePick.value.onClose();
    dynamicForm.state.secondVisitorType.value = selectedOptions.value;
    dynamicForm.state.secondVisitorType.text = selectedOptions.text;
  },
})

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
    dynamicForm.state.isv_id.value = selectedOptions.value;
    dynamicForm.state.isv_id.text = selectedOptions.text;
  },
})

const plateNumberPick = reactive({
  show: false,
  index: 0,
  onShow(index) {
    if (!isNaN(index)) plateNumberPick.index = index;
    plateNumberPick.show = !plateNumberPick.show;
  },
  confirm(val) {
    plateNumberPick.show = false;
    dynamicForm.state.followVisitors[plateNumberPick.index].v_plateNumber = val;
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
        bottom: 0;
      }
    }
  }

  .form-title-box-rt {
    float: right;
    color: #2196f3;
    margin-right: 16px;
    font-weight: bold;
    display: flex;
    justify-content: center;

    .minus-icon {
      position: relative;
      top: 1px;
    }
  }

  .form-title {
    padding: 8px 0 8px 20px;
    font-weight: bold;
    border-left: 5px solid #2196f3;
    background: #e8f3fe;
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
    color: #2196f3;
    font-weight: bold;
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
    text-align: right;
    color: rgb(128, 128, 128);

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
    color: #2196f3;
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
    background: #ffffff;
    box-sizing: border-box;

    button {
      background-color: #2196f3;
    }
  }
}
</style>