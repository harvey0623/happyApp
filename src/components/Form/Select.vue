<template>
<div class="formRow">
   <slot></slot>
   <ValidationProvider 
      class="formContent" tag="div" 
      :rules="rules" v-slot="{ errors }">
      <select class="form-control" :name="fieldName" v-model="observeValue">
         <option
            v-for="(item, index) in options"
            :key="index" 
            :value="item.value"
         >{{ item.title }}</option>
      </select>
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
         type: String,
         required: true
      },
      fieldName: {
         type: String,
         required: true
      },
      options: {
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