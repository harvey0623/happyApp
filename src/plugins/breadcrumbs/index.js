import Vue from 'vue';
import VueBreadcrumbs from 'vue-breadcrumbs';
import i18n from '@/plugins/i18n/index.js';

//https://github.com/samturrell/vue-breadcrumbs
Vue.use(VueBreadcrumbs, {
   template:`
      <div class="mybreadcrumb" v-if="$breadcrumbs.length">
         <router-link to="/">
            <i class="fas fa-home"></i>
            <span>${ i18n.t('seo.home.title') }</span>
         </router-link>
         <router-link
            class="breadcrumb-link"
            v-for="(crumb, key) in $breadcrumbs" 
            :to="linkProp(crumb)" :key="key">
            <span> / {{ crumb | crumbText }}</span>
         </router-link>
      </div>`
});