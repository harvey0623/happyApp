<template>
<div class="formRow">
   <slot></slot>
   <ValidationProvider 
      tag="div" class="formContent" 
      :rules="rules" v-slot="{ errors }">
      <label v-for="(item,index) in checkboxes" :key="index">
         <input 
            type="checkbox" 
            :value="item.value" 
            v-model="observeValue">
         <span>{{ item.title }}</span>
      </label>
      <p
         class="validate-error"
         v-if="errors.length !== 0"
      >{{ errors[0] }}</p>
   </ValidationProvider>
</div>
</template>

<script>
export default {
   props: {
      rules: {
         type: String,
         required: true
      },
      value: {
         type: Array,
         required: true
      },
      checkboxes: {
         type: Array,
         required: true
      }
   },
   computed: {
      observeValue: {
         get() {
            return this.value;
         },
         set(val) {
            this.$emit('input', val);
         }
      }
   }
}
</script>

<style>

</style>