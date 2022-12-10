<template>
  <view class="areas-pick">
    <nut-popup position="bottom" @click-close-icon="onClose" @click-overlay="onClose" round
               :style="{ height: '80%' }" v-model:visible="props.visible">
      <template v-slot>
        <view class="container">
          <view class="title">{{props.title || ''}}</view>
          <nut-checkboxgroup class="areas-checkbox-group" v-model="checkboxGroupsValue">
            <template v-for="(i, index) in props.options" :key="index">
              <nut-checkbox class="areas-checkbox" :label="String(i.value)">
                <view class="areas-checkbox-content">
                  <view class="areas-checkbox-lt">
                    <img src="" alt="">
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
const props = defineProps(['visible', 'options', 'confirm', 'close', 'title']);
const checkboxGroupsValue = ref([]);

function onClose() {
  props?.close();
}

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
      padding: 21px 0;
      border-bottom: 1px solid rgb(247,247,247);
      position: sticky;
      top: 0;
      left: 0;
      width: 100vw;
      background: #fff;
      z-index: 1;
    }

    .confirm {
      width: 100vw;
      height: 54px;
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