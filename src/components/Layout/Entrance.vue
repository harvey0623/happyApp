<template>
<div class="entranceLayout">
	<div class="backBox" v-if="showBack" :class="{ hasMargin: hasMargin }">
		<i class="fal fa-long-arrow-left" @click="backHandler"></i>
	</div>
	<slot></slot>
</div>
</template>

<script>
export default {
	computed: {
		routeName() {
			return this.$route.name;
		},
		showBack() {
			return this.routeName !== 'entrance';
		},
		hasMargin() {
			let lists = ['register', 'forgotPw'];
			return lists.includes(this.routeName);
		}
	},
	methods: {
		backHandler() {
			this.$router.back();
		}
	}
}
</script>

<style lang="scss">
.entranceLayout {
	min-height: 100vh;
	padding-bottom: 40px;
	background-image: url("~@/assets/img/bg.png");
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
}

.backBox {
	padding: 5px 15px 0;
	color: #fff;
	font-size: 30px;
	&.hasMargin {
		margin-bottom: 30px;
	}
}

</style>