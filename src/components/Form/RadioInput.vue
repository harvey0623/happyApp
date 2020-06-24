<template>
<div class="formRow">
   <slot></slot>
   <ValidationProvider 
      class="formContent" tag="div" 
      :rules="rules" v-slot="{ errors }">
      <label v-for="(radio,index) in radios" :key="index">
         <input 
            type="radio" 
            v-model="observeValue"
            :name="radio.name" 
            :value="radio.value">
         <span>{{ radio.title }}</span>
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
         type: String,
         required: true
      },
      radios: {
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