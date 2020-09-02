<template>
<div class="profileTab">
   <router-link 
      v-for="tab in tabList"
      :key="tab.name"
      :to="{ name: tab.name }"
      class="tabItem"
      :class="{ active: routeName === tab.name }"
      :ref="tab.name"
      replace
   >{{ tab.title }}</router-link>
   <div 
      class="moveItem"
      :class="{ animate: isAnimate }"
      ref="moveItem"
   ></div>
</div>
</template>

<script>
export default {
   data: () => ({
      isAnimate: false,
      tabList: [
         { title: '社區資料', name: 'community' },
         { title: '組織成員', name: 'organize' },
      ]
   }),
   computed: {
      routeName() {
         return this.$route.name;
      }
   },
   methods: {
      moveItem() {
         let el = this.$refs[this.routeName][0].$el;
         let posX = el.offsetLeft;
         this.$refs.moveItem.style.left = `${posX}px`;
      }
   },
   mounted() {
      this.moveItem();
      setTimeout(() => {
         this.isAnimate = true;
      }, 10);
   },
   watch: {
      $route() {
         this.moveItem();
      }
   }
}
</script>

<style lang="scss" scoped>
$height: 40px;

.profileTab {
   position: relative;
   display: flex;
   height: $height;
   margin-bottom: 30px;
   background-color: map-get($elBgColor, position);
   border-radius: 100px;
   >.tabItem {
      position: relative;
      flex: 1;
      line-height: $height;
      text-align: center;
      color: map-get($fontColor, tab);
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