<template>
<div class="sidebarItem">
   <div class="itemTop" @click="openHandler">
      <i class="featureIcon" :class="iconClass"></i>
      <span>{{ title }}</span>
      <i class="fal fa-chevron-down" :class="{rotate: isSlideDown}"></i>
   </div>
   <SlideUpDown class="itemBottom" :active="isSlideDown" :duration="250">
      <router-link
         v-for="(child,index) in children"
         :key="index"
         :to="child.href"
         @click.native="hrefPage"
      >{{ child.title }}</router-link>
   </SlideUpDown>
</div>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down';
export default {
   props: {
      id: {
         type: String,
         required: true
      },
      title: {
         type: String,
         required: true
      },
      iconClass: {
         type: String,
         required: true
      },
      isSlideDown: {
         type: Boolean,
         required: true
      },
      children: {
         type: Array,
         required: true
      }
   },
   methods: {
      openHandler() {
         this.$emit('update', {
            id: this.id,
            status: !this.isSlideDown
         });
      },
      hrefPage() {
         this.$store.commit('setMenuOpen', false);
      }
   },
   components: {
      SlideUpDown
   }
}
</script>