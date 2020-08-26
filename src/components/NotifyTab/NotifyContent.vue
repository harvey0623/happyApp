<template>
<div class="notifyContent">
   <NotifyList
      v-for="(list,index) in filterList"
      :key="index"
      :list="list.data"
      :showRemove="showRemove"
   ></NotifyList>
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

<style scoped>

</style>