<template>
<div class="notifyTab">
   <div 
      class="tabItem"
      v-for="tab in tabList"
      :key="tab.id"
      :class="{ active: currentTabId === tab.id }"
      :ref="`x${tab.id}`"
      @click="changeTab(tab.id, $event)"
   >{{ tab.title }}</div>
   <div 
      class="moveItem" 
      :class="{ animate: isAnimate }" 
      ref="moveItem"
   ></div>
</div>
</template>

<script>
export default {
   props: {
      currentTabId: {
         type: Number,
         required: true
      }
   },
   data: () => ({
      isAnimate: false,
      isFirst: true,
      tabList: [
         { id: 2, title: '郵政通知' },
         { id: 3, title: '用戶通知' },
      ]
   }),
   methods: {
      changeTab(id, evt) {
         let el = this.$refs.moveItem;
         let posX = evt.target.offsetLeft;
         el.style.left = `${posX}px`;
         if (!this.isFirst) this.$emit('tabUpdate', { id });
         this.isFirst = false;
      },
      tirggerEvent() {
         let el = this.$refs[`x${this.currentTabId}`][0];
         el.dispatchEvent(new Event('click'));
         setTimeout(() => {
            this.isAnimate = true;
         }, 0);
      }
   },
   mounted() {
      this.tirggerEvent();
   }
}
</script>

<style lang="scss" scoped>
$height: 40px;

.notifyTab {
   position: relative;
   display: flex;
   height: $height;
   background-color: map-get($elBgColor, position);
   border-radius: 100px;
   >.tabItem {
      position: relative;
      flex: 1;
      line-height: $height;
      text-align: center;
      color: #3C4043;
      z-index: 2;
      &.active {
         transition: color 0.1s;
         transition-delay: 0.09s;
         color: #fff;
      }
   }
}

.moveItem {
   position: absolute;
   left: 0;
   top: 0;
   @include size(50%, $height);
   z-index: 1;
   background-color: map-get($elBgColor, header);
   border-radius: 100px;
   &.animate {
      transition: left 0.2s;
   }
}
</style>