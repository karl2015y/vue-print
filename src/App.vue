<template>
  <div class="flex flex-col items-start gap-4 p-4">
    <div class="border p-3">
      <div class="text-xl font-bold">
        Vue i18n
      </div>
      <div class="flex gap-10 ">
        <q-select
          v-model="lang"
          :options="langOptions"
          label="目前語系"
          filled
          emit-value
          map-options
          style="min-width: 150px"
        />

        <q-btn
          icon="home"
          class="w-40"
          no-caps
        >
          {{ t('hello') }} {{ store.data }}
        </q-btn>
      </div>
    </div>



    <div class="border p-3">
      <div class="text-xl font-bold">
        VueUse useMouse
      </div>
      <div class="text-xl">
        x : {{ x }}、y : {{ y }}
      </div>
    </div>

    <div class="border p-3 ">
      <div class="btn">
        Shortcuts Class Btn（開啟 UnoCSS 即可看見效果）
      </div>
    </div>

    <div class="border p-3">
      <div class="text-xl font-bold">
        Tailwind 3.3 新色票
      </div>
      <div class=" w-8 h-8 bg-gray-950" />
    </div>

    <div class=" border p-3">
      <div class="text-xl font-bold">
        Vue 3.3 Generic Component
        <a
          href="https://blog.vuejs.org/posts/vue-3-3"
          class=" text-sky-400"
          target="_blank"
        >
          說明
        </a>
      </div>
      <generic-label
        v-slot="{ label }"
        :label="1"
      >
        label： {{ label }}
      </generic-label>
    </div>

    <div class="border p-3">
      <div class="text-xl font-bold">
        Quasar q-date
      </div>
      <q-date v-model="date" />
    </div>
  </div>

  <router-view />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import quasarLangs from 'quasar/lang/index.json';
import { LangCode } from './locales/i18n';

import GenericLabel from './components/generic-label.vue';

import { useMeta } from 'quasar';
import { useMouse } from '@vueuse/core';
import { useMainStore } from './stores/main.store';
import { useLang } from './composables/use-lang';

const store = useMainStore();
const { x, y } = useMouse();
const { t } = useLang();

const date = ref();

const lang = ref(store.lang);
watch(lang, (value) => store.setLang(value));

const langs = quasarLangs.filter((lang) =>
  (Object.values(LangCode) as string[]).includes(lang.isoName)
);
const langOptions = langs.map((lang) => ({
  label: lang.nativeName, value: lang.isoName
}));


useMeta(() => ({
  title: `Vue Quasar TypeScript Template Web`,
  titleTemplate: (title) => `${title} v${import.meta.env.PACKAGE_VERSION}`,
  htmlAttr: {
    lang: lang.value
  }
}));

console.log(`log 一下`);
</script>

<style lang="sass">
html, body, #app
  width: 100%
  height: 100%
  padding: 0
  margin: 0

#app
  display: flex
  flex-direction: column
</style>
