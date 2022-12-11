<template>
  <view class="search-picker">
    <nut-popup position="bottom" @click-overlay="onClose"
               :style="{ height: '60%' }" v-model:visible="props.visible">
      <template v-slot>
        <view class="container">
          <view class="title">
            <nut-searchbar class="search-bar" v-model="searchValue" @search="onSearch" :placeholder="props.placeholder">
              <template v-slot:rightout>
                <view @click="() => onSearch(searchValue)">搜索</view>
              </template>
            </nut-searchbar>
          </view>
          <nut-checkboxgroup class="areas-checkbox-group" :max="1" v-model="checkboxGroupsValue">
            <template v-for="(i, index) in state.options" :key="index">
              <nut-checkbox class="areas-checkbox" @click="() => onConfirm([String(i.value)])" :label="String(i.value)">
                <view class="areas-checkbox-item-text">
                  {{i.text}}
                </view>
              </nut-checkbox>
            </template>
            <view class="data-empty" v-if="!state.options.length">暂无数据</view>
          </nut-checkboxgroup>
        </view>
      </template>
    </nut-popup>
  </view>
</template>

<script setup>
import {reactive, ref} from "vue";

const props = defineProps(['visible', 'options', 'confirm', 'close', 'placeholder', 'request']);
const searchValue = ref('');
const checkboxGroupsValue = ref([]);
const state = reactive({
  options: props.options || [],
})
function onClose() {
  props?.close();
}

function onConfirm(i) {
  checkboxGroupsValue.value = i;
  props?.confirm(state.options.find(o => String(o.value) === i[0]));
}

function onSearch(val) {
  props.request(val).then(res => {
    state.options = res.data;
  });
}


</script>

<style lang="scss">
.search-picker {
  position: relative;
  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    .areas-checkbox-group {
      margin: 0 24px;
      .nut-checkbox__icon {
        color: rgb(183, 165, 104);
      }
      .areas-checkbox {
        display: flex;
        .areas-checkbox-item-text {
          padding: 16px 0;
          border-top: 1px solid rgb(247,247,247);
        }
      }
    }
    .data-empty {
      justify-content: center;
      height: 100%;
      align-items: center;
      display: flex;
    }

    .title {
      position: sticky;
      top: 0;
      left: 0;
      width: 100vw;
      z-index: 1;
      background: #fff;
    }
    .search-bar {
      color: #000;
      .nut-searchbar__search-input {
        height: 30px;
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
  }

}
</style>