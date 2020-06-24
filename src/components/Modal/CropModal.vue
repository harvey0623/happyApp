<template>
<b-modal 
   id="cropModal"
   modal-class="baseModal"
   centered 
   no-close-on-backdrop>
   <template v-slot:modal-header="{ close }">
      <span class="closeSpan" @click="close()">
         <i class="far fa-times"></i>
      </span>
   </template>
   <template v-slot:default>
      <VueCropper
         class="cropBox" 
         ref="cropper"
         :src="cropImg" 
         :aspectRatio="aspectRatio"
         :zoomable="false" 
         :viewMode="3"
         :ready="readyHandler"
      ></VueCropper>
   </template>
   <template v-slot:modal-footer="{ close }">
      <BaseButton 
         class="btnLogin"
         text="裁切"
         iconClass="far fa-crop"
         @click.native="cropHandler"
      ></BaseButton>
      <BaseButton
         class="btnReset"
         text="取消"
         iconClass="fal fa-times"
         @click.native="close()"
      ></BaseButton>
   </template>
</b-modal>
</template>

<script>
export default {
   props: {
      cropImg: {
         type: String,
         required: true
      },
      aspectRatio: {
         type: Number,
         required: true
      },
      cropWidth: {
         type: Number,
         required: true
      },
      cropHeight: {
         type: Number,
         required: true
      }
   },
   data: () => ({
      
   }),
   methods: {
      readyHandler() {

      },
      cropHandler() {
         let base64 = this.$refs.cropper.getCroppedCanvas({
            width: this.cropWidth,
            height: this.cropHeight,
            imageSmoothingQuality: 'high'
         }).toDataURL();
         this.$emit('cropped', base64);
         this.$bvModal.hide('cropModal');
      },
   },
}
</script>

<style lang="scss">
.cropBox {
   >img {
      max-width: 100%;
   }
}
</style>