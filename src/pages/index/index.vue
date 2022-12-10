<template>
  <view class="index">
    <nut-searchbar class="searchbarWrap" v-model="searchValue" @search="onSearch" placeholder="请输入被拜访人/拜访事由/状态查询">
      <template v-slot:leftin>
        <nut-icon font-class-name="iconfont" class-prefix="icon" name="search"/>
      </template>
    </nut-searchbar>
    <scroll-view class="scroll-box"
                 :scroll-y="true"
                 :scroll-top="0">
      <template v-for="(item, index) in 100">
        <info-card  @click="toDetail(item)"/>
      </template>
    </scroll-view>
    <view class="bottom-btn">
      <nut-button block type="primary" color="rgb(183,165,104)" @click="toApply">申请入园</nut-button>
    </view>
  </view>
</template>

<script setup>
import {ref} from 'vue';
import InfoCard from "./info-card";
import Taro from "@tarojs/taro";

const searchValue = ref('');

function onSearch(e) {
  searchValue.value = e;
}

function toDetail(item) {
  Taro.navigateTo({
    url: `/pages/apply_detail/index?id=${item}`,
  });
}

function toApply() {

}

</script>

<style lang="scss">
.index {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: rgb(241,241,241);
  .scroll-box {
    height: calc(100vh - 116px);
  }
  .searchbarWrap {
    .nut-searchbar__search-input {
      height: 40px;
    }
    .nut-searchbar__input-inner {
      form {
        display: block;
        width: 100%;
      }
      .nut-searchbar__input-bar {
        width: calc(100% - 35px);
      }
    }
  }

  .bottom-btn {
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: 10px 30px;
    box-sizing: border-box;
  }
}
</style>
