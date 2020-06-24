<template>
<div class="avatar">
   <div class="avatarBox">
      <div class="avatarImg" :style="avatarBg"></div>
      <ValidationProvider 
         tag="label"
         class="uploadPanel" 
         :rules="uploadRules"
         ref="fileProvider">
         <i class="far fa-camera"></i>
         <span>上傳圖片</span>
         <input 
            type="file"
            accept="image/*"
            ref="avatarInput"
            @change="fileChange">
      </ValidationProvider>
      <p class="limitText">
         {{ `上傳${limitNumber}MB的jpg或png圖片` }}
      </p>
   </div>
   <CropModal
      :cropImg="cropImg"
      :aspectRatio="aspectRatio"
      :cropWidth="cropWidth"
      :cropHeight="cropHeight"
      @cropped="setAvatar"
   ></CropModal>
</div>
</template>

<script>
import CropModal from '@/components/Modal/CropModal.vue';
const reader = new FileReader();

export default {
   props: {
      uploadRules: {
         type: String,
         required: true
      },
      avatarImg: {
         type: String,
         required: true
      },
      aspectRatio: {
         type: Number,
         default: 1
      },
      cropWidth: {
         type: Number,
         default: 200
      },
      cropHeight: {
         type: Number,
         default: 200
      },
      limitNumber: {
         type: Number,
         required: true
      }
   },
   data: () => ({
      cropImg: ''
   }),
   computed: {
      avatarBg() {
         return { backgroundImage: `url(${this.avatarImg})` }
      }
   },
   methods: {
      async fileChange(evt) {
         let { valid, errors } = await this.$refs.fileProvider.validate(evt);
         if (valid) {
            reader.readAsDataURL(evt.target.files[0]);
         } else {
            this.resetInput();
         }
      },
      onloadHandler(evt) {
         this.cropImg = evt.target.result;
         this.$bvModal.show('cropModal');
         this.resetInput();
      },
      resetInput() {
         this.$refs.avatarInput.type = 'text';
         this.$refs.avatarInput.type = 'file';
      },
      setAvatar(base64) {
         this.$emit('update:avatarImg', base64);
      }
   },
   mounted() {
      reader.addEventListener('load', this.onloadHandler);
   },
   beforeDestroy() {
      reader.removeEventListener('load', this.onloadHandler);
   },
   components: {
      CropModal
   }
}
</script>

<style lang="scss">
.avatar {
   margin-bottom: 35px;
}

.avatarBox {
   width: 180px;
   >.avatarImg {
      height: 240px;
      background-size: cover;
   }
   >.limitText {
      padding-top: 5px;
   }
}

.uploadPanel {
   display: block;
   padding: 3px 0;
   text-align: center;
   background-color: map-get($elBgColor, site);
   color: #fff;
   @include pxToRem(16);
   cursor: pointer;
   >span {
      margin-left: 3px;
   }
   >input {
      display: none;
   }
}
</style>