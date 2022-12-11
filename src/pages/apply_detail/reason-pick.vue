<template>
  <view class="reason-pick">
    <nut-popup position="bottom" @click-overlay="onClose"
               :style="{ height: '60%' }" v-model:visible="props.visible">
      <template v-slot>
        <view class="container">
          <view class="title">
            {{props.title || ''}}
            <nut-icon class="title-close-icon" name="close" @click="onClose"></nut-icon>
          </view>
          <template v-for="i in props.options" :key="i.value">
            <nut-button class="line-item" shape="square" @click="() => onConfirm(i)">{{i.text}}</nut-button>
          </template>
          <view class="data-empty" v-if="!props.options.length">暂无数据</view>
        </view>
      </template>
    </nut-popup>
  </view>
</template>

<script setup>
const props = defineProps(['visible', 'options', 'confirm', 'close', 'title']);

function onClose() {
  props?.close();
}

function onConfirm(i) {
  props?.confirm?.(i);
}
</script>

<style lang="scss">
.reason-pick {
  position: relative;
  background: rgb(247,247,247);
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .data-empty {
      justify-content: center;
      align-items: center;
      display: flex;
      flex: 1;
    }
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
    .line-item {
      display: block;
      color: #000;
      font-size: 16px;
      text-align: center;
      padding: 20px 0;
      border: none;
      border-bottom: 1px solid rgb(247,247,247);
    }
  }
}
</style>