<template>
<li class="patrolList">
   <div class="patrolToggle" @click="isOpen = !isOpen">
      <i class="fal fa-thumbtack"></i>
      <span>巡查點</span>
      <i class="fas fa-caret-down"></i>
   </div>
   <SlideUpDown :active="isOpen" class="patrolInfo" :duration="300">
      <div class="infoTop">
         <p>哨點名稱 : {{ patrol.vTitle }}</p>
         <p>順序序號 : {{ patrol.vDetail }}</p>
      </div>
      <div class="infoBottom">
         <div><i class="fas fa-circle"></i>需執行事項</div>
         <p>{{ patrol.vSummary }}</p>
         <div class="btnBox space_bwtween">
            <button class="outline-verify">巡檢回報</button>
            <button class="btnPatrol">巡邏點打卡</button>
         </div>
      </div>
   </SlideUpDown>
</li>
</template>

<script>
export default {
   props: {
      patrol: {
         type: Object,
         required: true
      }
   },
   data: () => ({
      isOpen: false
   })
}
</script>

<style lang="scss" scoped src="./index.scss"></style>