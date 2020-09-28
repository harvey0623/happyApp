<template>
<keep-alive :include="['workMission', 'patrolMission']">
   <router-view></router-view>
</keep-alive>
</template>

<script>
export default {
   name: 'tempView'
}
</script>