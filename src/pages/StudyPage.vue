<template>
  <q-page class="row items-center justify-evenly">
    <q-card> {{ currentVerb?.grundform }} </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSheetStore } from '../stores/sheets';

const sheetsStore = useSheetStore();

sheetsStore.fetchSheet();

const verben = computed(() => sheetsStore.verben);

const currentVerb = computed(() => sheetsStore.verben[0]);
</script>
