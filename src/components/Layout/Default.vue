<template>
<div class="defaultLayout">
	<Header></Header>
	<transition name="fade">
		<Cover v-if="isMenuOpen"></Cover>
	</transition>
	<transition name="slide-right">
		<Sidebar v-show="isMenuOpen"></Sidebar>
	</transition>
	<slot></slot>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header/index.vue';
import Cover from '@/components/Cover/index.vue';
import Sidebar from '@/components/Sidebar/index.vue';
export default {
	computed: {
		...mapState(['isMenuOpen'])
	},
	mounted() {

	},
   components: {
		Header,
		Cover,
		Sidebar
	}
}
</script>

<style lang="scss">
.defaultLayout {
	padding-top: map-get($heightObj, header);
}
</style>