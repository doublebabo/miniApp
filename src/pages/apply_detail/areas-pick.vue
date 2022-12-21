<template>
  <view class="areas-pick">
    <nut-popup position="bottom" @click-close-icon="onClose" @click-overlay="onClose"
               :style="{ height: '80%' }" v-model:visible="visible">
      <template v-slot>
        <view class="container">
          <view class="title">
            {{props.title || ''}}
            <nut-icon class="title-close-icon" name="close" @click="onClose"></nut-icon>
          </view>
          <nut-checkboxgroup class="areas-checkbox-group" v-model="checkboxGroupsValue">
            <template v-for="(i, index) in props.options" :key="index">
              <nut-checkbox class="areas-checkbox" :label="String(i.value)">
                <view class="areas-checkbox-content">
                  <view class="areas-checkbox-lt">
                    <img src="data:image/png;base64,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" alt="">
                  </view>
                  <view class="areas-checkbox-rt">
                    <text class="areas-checkbox-rt-super">{{i.name}}</text>
                    <text class="areas-checkbox-rt-sub">{{i.address}}</text>
                  </view>
                </view>
              </nut-checkbox>
            </template>
            <view class="data-empty" v-if="!props.options.length">暂无数据</view>
          </nut-checkboxgroup>
          <nut-button class='confirm' shape="square" @click="onConfirm">确定</nut-button>
        </view>
      </template>
    </nut-popup>
  </view>
</template>

<script setup>
import {ref} from "vue";
const props = defineProps(['options', 'confirm', 'title']);
const checkboxGroupsValue = ref([]);

const visible = ref(false);

function onClose() {
  visible.value = false;
}

function onShow() {
  visible.value = true;
}

defineExpose({
  onClose,
  onShow
})

function onConfirm() {
  const result = [];
  props?.options?.forEach(o => {
    if ([...checkboxGroupsValue.value].includes(String(o.value))) {
      result.push({...o});
    }
  });
  props?.confirm?.(result);
}
</script>

<style lang="scss">
.areas-pick {
  .container {
    position: relative;
    background: rgb(247,247,247);
    display: flex;
    flex-direction: column;
    height: 100%;
    .title {
      color: #000;
      font-weight: bold;
      font-size: 16px;
      text-align: center;
      padding: 16px 0;
      border-bottom: 1px solid rgb(247,247,247);
      position: sticky;
      top: 0;
      left: 0;
      width: 100vw;
      background: #fff;
      z-index: 1;
      .title-close-icon {
        position: absolute;
        right: 30px;
        top: 50%;
        color: rgb(200,201,204);
        transform: translateY(-50%);
        font-size: 10px;
      }
    }

    .confirm {
      width: 100vw;
      height: 74px;
      padding-bottom: 20px;
      background: #fff;
      position: sticky;
      bottom: 0;
      left: 0;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 5px;
      color: rgb(183,165,104);
      border: none;
      border-top: 5px solid rgb(247,247,247);
    }
    .areas-checkbox-group {
      padding: 0 24px;
      background: #fff;
      flex: 1;
      .nut-checkbox__icon {
        color: #2196f3;
      }
      .data-empty {
        justify-content: center;
        height: 100%;
        align-items: center;
        display: flex;
      }
      .areas-checkbox {
        padding: 14px 0;
        border-bottom: 1px solid rgb(247,247,247);
        .areas-checkbox-content {
          display: flex;
          flex-wrap: nowrap;
          gap: 8px;
          .areas-checkbox-lt {
            width: 70px;
            height: 45px;
            flex-shrink: 0;
            border: 1px solid rgb(247,247,247);
            align-self: center;
            img {
              width: 70px;
              height: 45px;
            }
          }
          .areas-checkbox-rt {
            flex-shrink: 1;
            word-break: break-all;
            display: flex;
            flex-direction: column;
            .areas-checkbox-rt-super {
              font-size: 15px;
            }
            .areas-checkbox-rt-sub {
              font-size: 12px;
              color: rgb(122,122,122);
            }
          }
        }

      }
    }
  }

}
</style>