<template>
  <view class="info-card">
    <view class="top-title">
      <text class="top-title-lf">商务交流</text>
      <text>已申请</text>
    </view>
    <view class="profile text-line">
      <nut-icon class="text-line-icon" font-class-name="iconfont" class-prefix="icon" name="people" />
      <text>王王王王</text>
    </view>
    <view class="company text-line">
      <nut-icon class="text-line-icon" font-class-name="iconfont" class-prefix="icon" name="Company" />
      <text>王者有限公司</text>
    </view>
    <view class="date text-line">
      <nut-icon class="text-line-icon" font-class-name="iconfont" class-prefix="icon" name="clock" />
      <text>2022-12-10 / 2022-12-10</text>
    </view>
    <view class="interviewee text-line">
      <view class="interviewee-lt">五</view>
      <text class="interviewee-rt">王五</text>
    </view>
  </view>
</template>

<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>

<style lang="scss">
.info-card {
  margin: 10px 20px;
  padding: 15px 20px;
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 6px;
  .text-line {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    .text-line-icon {
      flex-shrink: 0;
      align-self: flex-start;
    }
  }
  .top-title {
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    .top-title-lf {
      font-weight: bold;
      font-size: 16px;
    }
  }
  .interviewee {
    .interviewee-lt {
      background: rgb(0,136,253);
      width: 22px;
      height: 22px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border-radius: 50%;
      font-size: 12px;
    }
    .interviewee-rt {
      color: rgb(122,122,122);
    }
  }

}
</style>