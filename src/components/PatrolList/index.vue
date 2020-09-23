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
         <p>順序序號 : {{ patrol.checkPointId }}</p>
      </div>
      <div class="infoBottom">
         <div><i class="fas fa-circle"></i>需執行事項</div>
         <p>{{ patrol.vSummary }}</p>
         <div class="btnBox space_bwtween">
            <button class="outline-verify">巡檢回報</button>
            <button class="btnPatrol" @click="punchHandler">
               <i class="fal fa-barcode-scan"></i>
               <span>巡邏點打卡</span>
            </button>
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
      isOpen: true,
      isScan: false
   }),
   methods: {
      punchHandler() {
         this.$emit('punch', {
            pointId: this.patrol.checkPointId,
            changeStatus: (status) => {
               this.isScan = status;
            }
         });
      }
   }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>