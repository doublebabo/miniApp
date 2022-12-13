<template>
  <view class="apply-list">
    <scroll-view class="scroll-box"
                 :scroll-y="true"
                 :scroll-top="0">
      <nut-searchbar class="searchbarWrap" v-model="searchValue" @search="onSearch" placeholder="请输入被拜访人/拜访事由/状态查询">
        <template v-slot:leftin>
          <nut-icon font-class-name="iconfont" class-prefix="icon" name="search"/>
        </template>
      </nut-searchbar>
      <template v-for="(item, index) in 100">
        <info-card  @click="toDetail(item)"/>
      </template>
      <view class="bottom-btn">
        <nut-button block type="primary" color="rgb(183,165,104)" @click="toApply">申请入园</nut-button>
      </view>
    </scroll-view>
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
  Taro.navigateTo({
    url: `/pages/apply_detail/index`,
  });
}

</script>

<style lang="scss">
.apply-list {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: rgb(241,241,241);
  .scroll-box {
    //height: calc(100vh - 126px);
    padding: 58px 0 68px 0;
  }
  .searchbarWrap {
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1;
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
    z-index: 1;
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: 10px 24px 20px 24px;
    box-sizing: border-box;
    background: rgb(241,241,241);
    button {
      border-radius: 7px;
    }
  }
}
</style>
