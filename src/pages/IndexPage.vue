<template>
  <q-page class="row items-center justify-evenly">
    verben: {{ verben }}
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSheetStore } from '../stores/sheets';

// https://docs.google.com/spreadsheets/d/1cz4SAePV011rWPZQ6IFfYfmNftpgXDefkmwABzp9s2k/edit?usp=sharing

const sheetsStore = useSheetStore();

sheetsStore.fetchSheet();

const verben = computed(() => sheetsStore.verben);
</script>
