<template>
<div class="defaultLayout">
	<Header></Header>
	<transition name="fade" mode="out-in">
		<Cover v-if="isMenuOpen" :key="isMenuOpen"></Cover>
	</transition>
	<slot></slot>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header/index.vue';
import Cover from '@/components/Cover/index.vue';
export default {
	computed: {
		...mapState(['isMenuOpen'])
	},
	mounted() {

	},
   components: {
		Header,
		Cover
	}
}
</script>

<style lang="scss">
.defaultLayout {
	padding-top: map-get($heightObj, header);
}
</style>