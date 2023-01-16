<template>
  <view class="plate-number-pick">
    <nut-popup position="bottom" @click-overlay="onClose"
               :style="{ height: '70%' }" v-model:visible="props.visible">
      <template v-slot>
        <view class="container">
          <view class="container-content">
            <view class="car-type">
              <nut-radiogroup v-model="carTypeValue" @change="onCarTypeChange">
                <nut-radio icon-active-name="checked" v-for="o in carType" :key="o.value" :label="o.value">{{o.text}}</nut-radio>
              </nut-radiogroup>
            </view>
            <view class="input-box">
              <template v-for="(o, oIndex) in plateNumberArray.values" :key="oIndex">
                <view class="box-item" @click="() => plateNumberArray.onClick(oIndex)" :class="{ 'box-item-active': plateNumberArray.index === oIndex }">
                  {{o}}
                </view>
                <view v-if="oIndex === 1" class="box-item-point"></view>
              </template>
            </view>
            <view class="pick-board">
              <template v-for="(o, oIndex) in getKeyboardData()" :key="oIndex">
                <button class="pick-board-item" @click="() => plateNumberArray.onSetVal(o)">
                  <text class="pick-board-item-text">{{o}}</text>
                </button>
              </template>
            </view>
          </view>
          <view class="action-btn">
            <button class="action-btn-item action-btn-item-cancel" size="mini" @click="onClose">取消</button>
            <view class="action-btn-lt">
              <button class="action-btn-item action-btn-item-del" size="mini" @click="plateNumberArray.onDelete">删除</button>
              <button class="action-btn-item action-btn-item-ok" size="mini" type="primary"  @click="onConfirm">完成</button>
            </view>
          </view>
        </view>
      </template>
    </nut-popup>
  </view>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import Taro from "@tarojs/taro";

const props = defineProps(['visible', 'confirm', 'close', 'values']);

const carType = [{text:'普通车牌', value: '1'}, {text:'新能源车牌', value: '2'}];

const normalData = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const commonCarDataMap = {
  0: ["京", "津", "冀", "晋", "蒙", "辽", "吉", "黑", "沪", "苏", "浙", "皖", "闽", "赣", "鲁", "豫", "鄂", "湘", "粤", "桂", "琼", "川", "贵", "云", "渝", "藏", "陕", "甘", "青", "宁", "新"],
  1: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
  2: normalData,
  3: normalData,
  4: normalData,
  5: normalData,
  6: normalData.concat(['港', '澳' ,'学', '领', '警']),
}

const ecoCarDataMap = {
  0: ["京", "津", "冀", "晋", "蒙", "辽", "吉", "黑", "沪", "苏", "浙", "皖", "闽", "赣", "鲁", "豫", "鄂", "湘", "粤", "桂", "琼", "川", "贵", "云", "渝", "藏", "陕", "甘", "青", "宁", "新"],
  1: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
  2: normalData,
  3: normalData,
  4: normalData,
  5: normalData,
  6: normalData,
  7: normalData.concat(['港', '澳' ,'学', '领', '警']),
}

const carTypeValue = ref(carType[0].value);

const plateNumberArray = reactive({
  values: new Array(7),
  index: 0,
  onClick(index) {
    plateNumberArray.index = index;
  },
  onSetVal(val) {
    plateNumberArray.values[plateNumberArray.index] = val;
    plateNumberArray.index = Math.min(plateNumberArray.index + 1, plateNumberArray.values.length - 1);
  },
  onDelete() {
    plateNumberArray.values[plateNumberArray.index] = null;
    plateNumberArray.index = Math.max(0, plateNumberArray.index - 1);
  },
});

watch(props, () => {
  if (props.values) {
    plateNumberArray.values = props.values.split('');
    if (props.values.length === 7) {
      carTypeValue.value = '1';
      plateNumberArray.index = 6;
    } else {
      carTypeValue.value = '2';
      plateNumberArray.index = 7;
    }
  } else {
    plateNumberArray.index = 0;
    plateNumberArray.values = new Array(7);
  }
})

function getKeyboardData() {
  if (carTypeValue.value === '1') {
    return commonCarDataMap[plateNumberArray.index];
  } else {
    return ecoCarDataMap[plateNumberArray.index];
  }
}


function onCarTypeChange(val) {
  carTypeValue.value = val;
  if (val === '1') {
    plateNumberArray.values = new Array(7);
    plateNumberArray.index = 0;
  } else {
    plateNumberArray.values = new Array(8);
    plateNumberArray.index = 0;
  }
}

function onConfirm() {
  const result = plateNumberArray.values.join('');
  if (result.length !== plateNumberArray.values.length) {
    Taro.showToast({
      title: '请输入完整车牌号',
      icon: 'none',
      duration: 1000,
    });
    return;
  }
  props?.confirm(result);
  onCarTypeChange(carType[0].value);
}

function onClose() {
  onCarTypeChange(carType[0].value);
  props?.close();
}
</script>

<style lang="scss">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .container-content {
    padding: 10px 12px 0 12px;
    flex: 1;
  }
  .car-type {
    .nut-radiogroup {
      display: flex;
      gap: 12px;
      .nut-radio {
        margin: 0;
      }
      .nut-radio__label {
        margin-left: 2px;
      }
      .nut-radio__icon {
        color: #2196f3;
      }
    }
  }

  .input-box {
    display: flex;
    flex-wrap: nowrap;
    height: 50px;
    gap: 5px;
    margin: 14px 0;
    .box-item {
      border-radius: 5px;
      border: 1px solid rgb(203,203,203);
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }
    .box-item-active {
      box-shadow: 0 0 6px #2196f3;
      border-color: #2196f3;
    }
    .box-item-point {
      width: 6px;
      height: 6px;
      flex: 0 0 auto;
      border: 1px solid rgb(200,202,204);
      border-radius: 50%;
      background: rgb(200,202,204);
      align-self: center;
    }
  }

  .pick-board {
    display: flex;
    flex-wrap: wrap;
    gap: 2px calc(100% * 0.04 / 7) ;
    &:after {
      content: '';
      flex: 1;
    }
    .pick-board-item {
      width: 12%;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
      margin: 0;
      height: 0;
      padding-top: 12%;
      position: relative;
      .pick-board-item-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
      }
    }
  }

  .action-btn {
    display: flex;
    justify-content: space-between;
    padding: 10px 12px 20px 12px;
    .action-btn-item-cancel {
      margin: 0;
    }
    .action-btn-item-ok {
      background-color: #2196f3;
    }
    .action-btn-lt {
      display: flex;
      gap: 8px;
    }
  }
}
</style>