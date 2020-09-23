<template>
<div id="qrcodeReader">
   <div class="closeText" @click="closeHandler">關閉</div>
   <div v-if="hasError" class="errorTip">{{ errorMessage }}</div>
   <div v-else class="lensBox">
      <qrcode-stream
         v-if="openCamera"
         :camera="cameraStatus"
         @decode="onDecode" 
         @init="onInit">
         <div v-show="cameraLoading">相機開啟中...</div>
         <div v-show="isProcess" class="process">處理中...</div>
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
      },
      cameraStatus: {
         type: String,
         required: true
      },
      isProcess: {
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
            this.errorMessage = this.errorInfo[error.name];
         } finally {
            this.cameraLoading = false;
         }
      },
      onDecode(data) {
         this.$emit('scan', data);
      },
      closeHandler() {
         if (this.isProcess) return;
         this.$emit('update:openCamera', false);
         this.$emit('update:cameraStatus', 'auto');
      }
   },
   components: {
      QrcodeStream
   }
};
</script>

<style lang="scss" src="./index.scss"></style>
