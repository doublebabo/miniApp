<template>
  <view class="index">
    <nut-button class="btn" size="large" block color="#1890FF" :loading="loading"  openType="getPhoneNumber" @getphonenumber="wxLogin">微信一键登录</nut-button>
  </view>
</template>

<script setup>
import {ref} from "vue";

const loading = ref(false)

function wxLogin(e) {
  console.log('wxLogin===========', e);
}

</script>

<style lang="scss">
.index {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    width: 70%;
  }
}
</style>
