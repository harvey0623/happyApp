<template>
<div class="keywordPanel">
   <i class="far fa-filter"></i>
   <span>所有通知</span>
   <div class="searchBox">
      <i class="fal fa-search"></i>
      <input type="text" class="myInput" placeholder="搜尋" v-model="keyword">
   </div>
   <span @click="editHandler">{{ editText }}</span>
</div>
</template>

<script>
export default {
   props: {
      value: {
         type: String,
         required: true
      },
      editId: {
         type: Number,
         required: true
      }
   },
   data: () => ({
      editStatus: {
         1: '編輯',
         2: '完成'
      }
   }),
   computed: {
      keyword: {
         get() {
            return this.value;
         },
         set(val) {
            this.$emit('input', val);
         }
      },
      editText() {
         return this.editStatus[this.editId];
      }
   },
   methods: {
      editHandler() {
         let id = this.editId === 1 ? 2 : 1;
         this.$emit('update:editId', id);
      }
   }
}
</script>

<style lang="scss" scoped>
.keywordPanel {
   display: flex;
   align-items: center;
   font-size: 14px;
   >.fa-filter {
      margin-right: 5px;
      color: map-get($fontColor, header);
      font-size: 17px;
   }
   >.searchBox {
      flex: 1;
      position: relative;
      margin: 0 10px;
      >.fa-search {
         position: absolute;
         left: 0;
         top: 8px;
         z-index: 1;
      }
      >.myInput {
         padding-left: 20px;
      }
   }
}
</style>