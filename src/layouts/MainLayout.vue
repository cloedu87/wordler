<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-secondary" style="height: 96px">
        <q-img
          v-if="$q.screen.lt.md"
          style="max-width: 4rem; -webkit-filter: invert(1); filter: invert(1)"
          src="favicon.ico"
          @click="toggleLeftDrawer"
        ></q-img>

        <q-toolbar-title> wordler.io </q-toolbar-title>

        <div>from &#128155; with &#128155;</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="text-secondary bg-tertiary"
      elevated
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header class="text-black">
          <q-img style="max-width: 4rem" src="favicon.ico"></q-img>
          Lern your grammar, NOW!
        </q-item-label>
        <q-separator />
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
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue'
import { ref } from 'vue'

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Hello',
    caption: 'may we have your attention please',
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
    caption: 'the spreadsheet of truth',
    icon: 'content_paste_go',
    link: 'https://docs.google.com/spreadsheets/d/1cz4SAePV011rWPZQ6IFfYfmNftpgXDefkmwABzp9s2k/edit#gid=514478750',
  },
  {
    title: 'Source',
    caption: 'git repository',
    icon: 'code',
    link: 'https://github.com/cloedu87/wordler',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
