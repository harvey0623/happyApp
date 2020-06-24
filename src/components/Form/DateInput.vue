<template>
<div class="formRow">
   <slot></slot>
   <DatePick
      v-model="dateValue"
      :nextMonthCaption="nextMonthCaption"
      :prevMonthCaption="prevMonthCaption"
      :setTimeCaption="setTimeCaption"
      :weekdays="weekdays"
      :months="months"
      :inputAttributes="inputAttributes"
      :format="'YYYY/MM/DD'"
      :displayFormat="'YYYY/MM/DD'"
      :startWeekOnSunday="true"
      :mobileBreakpointWidth="576"
      :selectableYearRange="5"
      class="formContent"
   ></DatePick>
</div>
</template>

<script>
//https://dbrekalo.github.io/vue-date-pick/
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
export default {
   props: {
      value: {
         type: String,
         default: ''
      },
      fieldName: {
         type: String,
         required: true
      },
      placeholder: {
         type: String,
         required: true
      }
   },
   data() {
      return {
         nextMonthCaption: '下個月',
         prevMonthCaption: '上個月',
         setTimeCaption: '時間',
         weekdays: ['一', '二', '三', '四', '五', '六', '日'],
         months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
         inputAttributes: {
            placeholder: this.placeholder,
            name: this.fieldName,
            readonly: false,
            class: 'form-control'
         }
      }
   },
   computed: {
      dateValue: {
         get() {
            return this.value;
         },
         set(val) {
            this.$emit('input', val);
         }
      }
   },
   mounted() {
      console.log(this.weekdays);
   },
   components: {
      DatePick
   }
}
</script>

<style lang="scss">
.vdpWithInput {
   input[readonly] {
      background-color: #fff;
   }
   .vdpClearInput {
      display: none;
   }
}
</style>