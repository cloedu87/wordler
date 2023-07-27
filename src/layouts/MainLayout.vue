<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> wordler.io </q-toolbar-title>

        <div>built from &#128155; with &#128155;</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header></q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { ref } from 'vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Hello',
    caption: 'start shuffle that words',
    icon: 'waving_hand',
    link: '/',
  },
  {
    title: 'Study',
    caption: 'start shuffle that words',
    icon: 'school',
    link: '/study',
  },
  {
    title: 'Sheet',
    caption: 'the source file',
    icon: 'content_paste_go',
    link: 'https://docs.google.com/spreadsheets/d/1cz4SAePV011rWPZQ6IFfYfmNftpgXDefkmwABzp9s2k/edit#gid=514478750',
  },
  {
    title: 'Source',
    caption: 'git repository',
    icon: 'code',
    link: 'https://github.com/cloedu87/wordler',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
