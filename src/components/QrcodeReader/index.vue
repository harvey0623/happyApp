<template>
<div id="qrcodeReader">
   <div class="closeText" @click="closeHandler">關閉</div>
   <div v-if="hasError" class="errorTip">{{ errorMessage }}</div>
   <div v-else class="lensBox">
      <qrcode-stream
         v-if="openCamera"
         @decode="onDecode" 
         @init="onInit">
         <div v-show="cameraLoading">相機開啟中...</div>
      </qrcode-stream>
   </div>
</div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
   props: {
      openCamera: {
         type: Boolean,
         required: true
      }
   },
   data: () => ({
      cameraLoading: false,
      errorMessage: '',
      errorInfo: {
         NotAllowedError: 'you need to grant camera access permisson',
         NotFoundError: 'no camera on this device',
         NotSupportedError: 'secure context required (HTTPS, localhost)',
         NotReadableError: 'is the camera already in use',
         OverconstrainedError: 'installed cameras are not suitable',
         StreamApiNotSupportedError: 'Stream API is not supported in this browser'
      }
   }),
   computed: {
      hasError() {
         return this.errorMessage !== '';
      },
   },
   methods: {
      async onInit(promise) {
         try {
            this.cameraLoading = true;
            await promise;
            this.errorMessage === '';
         } catch (error) {
            console.log(error);
            this.errorMessage = this.errorInfo[error.name];
         } finally {
            this.cameraLoading = false;
         }
      },
      onDecode(result) {
         console.log(result);
         this.result = result;
      },
      closeHandler() {
         this.$emit('update:openCamera', false);
      }
   },
   components: {
      QrcodeStream
   }
};
</script>

<style lang="scss">
%cameraSize {
   width: 300px;
   height: 300px;
}
#qrcodeReader {
   position: fixed;
   left: 0;
   top: 0;
   @extend %centerFlex;
   @include size(100%, 100vh);
   background-color: #000;
   color: #fff;
   font-size: 20px;
   z-index: 20;
   >.closeText {
      position: absolute;
      left: 20px;
      top: 20px;
   }
   >.lensBox {
      @extend %cameraSize;
      .overlay {
         @extend %cameraSize;
         @extend %centerFlex;
      }
   }
}
</style>
