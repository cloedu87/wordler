<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="word-card" square>
      <template v-if="amountOfVerbs !== 0">
        <q-linear-progress :value="progress" color="tertiary" />
        <q-card-section class="text-h5 text-center">{{
          currentVerb?.grundform
        }}</q-card-section>
        <q-card-actions class="absolute-bottom q-pa-none" vertical>
          <q-btn
            size="lg"
            square
            color="primary"
            label="Next"
            @click="next()"
          />
        </q-card-actions>
      </template>

      <q-inner-loading :showing="amountOfVerbs === 0">
        <q-spinner-gears size="50px" color="secondary" />
      </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSheetStore } from '../stores/sheets'

const sheetsStore = useSheetStore()

sheetsStore.fetchSheet()

const verben = computed(() => sheetsStore.verben)
const amountOfVerbs = computed(() => verben.value.length || 0)
const currentVerbIndex = ref(0)
const currentVerb = computed(() => verben.value[currentVerbIndex.value])

const progress = computed(() => {
  return amountOfVerbs.value != 0
    ? ((100 / amountOfVerbs.value) * currentVerbIndex.value) / 100
    : 0
})

const next = () => {
  if (currentVerbIndex.value < amountOfVerbs.value) {
    currentVerbIndex.value++
  }
}
</script>
