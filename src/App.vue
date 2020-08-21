<template>
<div id="app">
   <component :is="layout">
      <keep-alive :include="['home']">
         <router-view></router-view>
      </keep-alive>
   </component>
</div>
</template>

<script>
import '@/assets/scss/modules/index.scss';
export default {
   metaInfo() {
      return {
         title: '',
         titleTemplate: '%s',
         meta: [
            { property: 'og:image', content: '' },
            { property: 'og:description', content: 'project' },
         ]
      }
   },
   data: () => ({
      
   }),
	computed: {
		layout() {
			return this.$route.meta.layout || 'defaultLayout';
      }
   }
}
</script>

<style>

</style>
