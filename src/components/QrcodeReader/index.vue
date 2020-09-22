<template>
<div class="qrcodeReader">
   <p class="error">{{ error }}</p>
   <p class="decode-result">Last result: <b>{{ result }}</b></p>
   <qrcode-stream
      v-if="openCamera"
      @decode="onDecode" 
      @init="onInit"
   ></qrcode-stream>
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
   data() {
      return {
         result: "",
         error: "",
      };
   },
   methods: {
      onDecode(result) {
         this.result = result;
      },
      async onInit(promise) {
         try {
            console.log('a');
            await promise;
         } catch (error) {
            if (error.name === "NotAllowedError") {
               this.error = "ERROR: you need to grant camera access permisson";
            } else if (error.name === "NotFoundError") {
               this.error = "ERROR: no camera on this device";
            } else if (error.name === "NotSupportedError") {
               this.error = "ERROR: secure context required (HTTPS, localhost)";
            } else if (error.name === "NotReadableError") {
               this.error = "ERROR: is the camera already in use?";
            } else if (error.name === "OverconstrainedError") {
               this.error = "ERROR: installed cameras are not suitable";
            } else if (error.name === "StreamApiNotSupportedError") {
               this.error =
                  "ERROR: Stream API is not supported in this browser";
            }
         }
      },
   },
   components: {
      QrcodeStream
   }
};
</script>

<style lang="scss" scoped>
.qrcodeReader {
   position: fixed;
   left: 0;
   top: 0;
   @include size(100%, 100vh);
   background-color: yellow;
   z-index: 20;
}
</style>
