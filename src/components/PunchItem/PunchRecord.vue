<template>
<p class="punchRecord">{{ shiftTime }}</p>
</template>

<script>
export default {
   props: {
      time: {
         type: String,
         required: true
      },
      type: {
         type: Number,
         required: true
      },
   },
   computed: {
      shiftCategory() {
         return this.type === 1 ? '上班' : '下班';
      },
      shiftTime() {
         return `${this.shiftCategory} ${this.time}`;
      }
   }
}
</script>