<template>
  <view class="index">
    <img :src="svg">
    <div class="finish">
      入园申请已提交
    </div>
    <button class="btn" size="mini" type="default" :plain="true" @click="onEnter">返回首页</button>
  </view>
</template>

<script setup>
import Taro from "@tarojs/taro";

const svg = require('./../../assets/posted.svg');

function onEnter() {
  Taro.navigateBack({
    url: `/pages/index/index`,
  });

}


</script>

<style lang="scss">
.index {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 15vh;
  .finish {
    color: #2196f3;
    font-size: 20px;
    font-weight: bold;
    position: relative;
    top: -20px;
  }
  .btn {
    margin-top: 20px;
  }
}
</style>
