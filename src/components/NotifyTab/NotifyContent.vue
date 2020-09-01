<template>
<div class="notifyContent">
   <div>
      <NotifyList
         v-for="(list,index) in filterList"
         :key="index"
         :list="list.data"
         :showRemove="showRemove"
      ></NotifyList>
   </div>
   <p class="loadingTip" v-show="isLoading">資料加載中~</p>
</div>
</template>

<script>
import NotifyList from './NotifyList.vue';
export default {
   props: {
      detail: {
         type: Object,
         required: true
      },
      showRemove: {
         type: Boolean,
         required: true
      }
   },
   computed: {
      lists() {
         return this.detail.data;
      },
      keyword() {
         return this.detail.keyword;
      },
      isLoading() {
         return this.detail.isLoading;
      },
      filterList() {
         let keyword = this.keyword;
         if (keyword === '') return this.lists;
         return this.lists.filter(item => {
            let { data } = item;
            let isInclude1 = data.action.includes(keyword);
            let isInclude2 = data.content.includes(keyword);
            let isInclude3 = data.time.includes(keyword);
            return isInclude1 || isInclude2 || isInclude3;
         });
      }
   },
   components: {
      NotifyList
   }
}
</script>