<template>
<div id="app">
   <component :is="layout">
      <keep-alive :include="['home']">
         <router-view></router-view>
      </keep-alive>
   </component>
   <Toastr></Toastr>
</div>
</template>

<script>
import '@/assets/scss/modules/index.scss';
import Toastr from '@/components/Toastr/index.vue';
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
	computed: {
		layout() {
			return this.$route.meta.layout || 'defaultLayout';
      }
   },
   components: {
      Toastr
   }
}
</script>

<style>

</style>
