<template>
<div class="entranceLayout">
	<slot></slot>
</div>
</template>

<script>
export default {
	computed: {
		
	},
	mounted() {
		
	},
   components: {

	}
}
</script>

<style>
.entranceLayout {
	min-height: 100vh;
	background-image: url("~@/assets/img/bg.png");
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
}
</style>