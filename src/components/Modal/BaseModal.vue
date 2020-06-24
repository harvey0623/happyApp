<template>
<b-modal
   :id="id" 
   no-close-on-backdrop
   centered 
   modal-class="baseModal"
   @hide="hiddenHandler">
   <template v-slot:modal-header="{ close }">
      <span class="closeSpan" @click="close()">
         <i class="far fa-times"></i>
      </span>
   </template>
   <template v-slot:default>
      <slot></slot>
   </template>
   <template v-slot:modal-footer="{ close }">
      <slot name="footer" :close="close"></slot>
   </template>
</b-modal>
</template>

<script>
export default {
   props: {
      id: {
         type: String,
         required: true
      },
   },
   data: () => ({
      
   }),
   methods: {
      hiddenHandler() {
         this.$emit('resetForm');
      }
   },
}
</script>

<style lang="scss" src="./index.scss"></style>