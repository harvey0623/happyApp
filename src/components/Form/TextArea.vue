<template>
<div class="formRow">
   <slot></slot>
   <ValidationProvider 
      class="formContent" tag="div" 
      :rules="rules" v-slot="{ errors }">
      <textarea 
         class="form-control" 
         v-model.trim="observeValue"
         :placeholder="placeholder" 
         :maxlength="maxLength" 
         :name="fieldName"
      ></textarea>
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
      placeholder: {
         type: String,
         default: ''
      },
      maxLength: {
         type: Number,
         default: 500
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