<template>
<div class="notifyList">
   <div class="listBox">
      <p class="title">{{ list.action }}</p>
      <div class="content">{{ list.content }}</div>
      <div class="time">通知時間 : {{ list.time }}</div>
   </div>
   <div class="removeBox" :class="{ show: showRemove }">
      <i class="fal fa-trash-alt"></i>
   </div>
</div>
</template>

<script>
export default {
   props: {
      list: {
         type: Object,
         required: true
      },
      showRemove: {
         type: Boolean,
         required: true
      }
   }
}
</script>

<style lang="scss" scoped>
$formColor: map-get($fontColor, form);

.notifyList {
   display: flex;
   border-bottom: 1px solid map-get($borderColor, primary);
   &:last-child {
      border-bottom: none;
   }
}

.listBox {
   flex: 1;
   padding: 20px;
   >.title {
      margin-bottom: 5px;
      color: map-get($fontColor, sidebar);
      font-size: 16px;
      font-weight: bold;
   }
   >.content {
      margin-bottom: 10px;
      color: $formColor;
      font-size: 14px;
      text-align: justify;
   }
   >.time {
      text-align: right;
      color: $formColor;
      font-size: 14px;
   }
}

.removeBox {
   display: flex;
   flex: 0 0 0px;
   background-color: map-get($elBgColor, remove);
   color: #fff;
   border-bottom: 1px solid #fff;
   overflow: hidden;
   &.show {
      flex: 0 0 35px;
   }
   >i {
      margin: auto;
   }
}
</style>