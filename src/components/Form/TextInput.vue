<template>
<div class="formRow">
   <slot></slot>
   <ValidationProvider 
      class="formContent" tag="div" 
      :rules="rules" v-slot="{ errors }"
      :vid="vid">
      <input
         class="form-control" 
         :type="fieldType" 
         v-model.trim="observeValue"
         :placeholder="placeholder" 
         :name="fieldName">
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
      fieldType: {
         type: String,
         default: 'text'
      },
      placeholder: {
         type: String,
         default: ''
      },
      vid: {
         type: String,
         default: ''
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