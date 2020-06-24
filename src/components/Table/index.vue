<template>
<div class="dataTable">
   <table class="mytable">
      <thead>
         <th 
            v-for="(item, index) in tableHeader" 
            :key="index"
            :width="titleWidth"
         >{{ item }}</th>
      </thead>
      <tbody>
         <tr>
            <td></td>
         </tr>
      </tbody>
   </table>
</div>
</template>

<script>
export default {
   props: {
      tableHeader: {
         type: Array,
         required: true
      },
   },
   computed: {
      titleWidth() {
         return (100 / this.tableHeader.length) + '%';
      },
   }
}
</script>

<style lang="scss">
.dataTable {
   border: 1px solid map-get($borderColor, search);
   .mytable {
      width: 100%;
      th, td {
         text-align: center;
      }
      th {
         padding: 10px;
         font-weight: normal;
         background-color: map-get($elBgColor, site);
         color: #fff;
      }
      tr {
         border-bottom: 1px dashed map-get($borderColor, search);
         &:last-child {
            border-bottom: none;
         }
      }
      td {
         padding: 15px;
      }
   }
}
</style>