<template>
  <q-page>
    <q-card
      flat
      class="wordler-card fit absolute"
      square
      v-if="progress !== 1 && amountOfVerbs !== 0"
    >
      <q-linear-progress :value="progress" color="priamary" />
      <q-card-section class="text-h5">
        <div v-if="!showSolution">
          {{ currentVerb.grundform }}
        </div>
        <div v-if="showSolution" class="row">
          <div class="col-md">
            <div>{{ currentVerb.prasens }}</div>
            <div>{{ currentVerb.prateritum }}</div>
            <div>{{ currentVerb.perfekt }}</div>
          </div>
          <div class="col-md">
            <div>{{ currentVerb.bedeutung }}</div>
            <div>{{ currentVerb.beispiel }}</div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions
        v-if="progress !== 1"
        class="absolute-bottom q-pa-none"
        vertical
      >
        <q-input
          filled
          square
          v-model="solution"
          color="secondary"
          label="Dare to type the solution?"
        />
        <q-btn
          size="lg"
          square
          color="primary"
          :label="!showSolution ? 'show solution' : 'next'"
          @click="next()"
        />
      </q-card-actions>
    </q-card>
    <q-card
      flat
      class="wordler-card fit absolute row items-center justify-evenly"
      square
      v-if="progress === 1"
    >
      <q-card-section class="text-h5"> finished! </q-card-section>
    </q-card>
    <q-inner-loading :showing="amountOfVerbs === 0">
      <q-spinner-gears size="50px" color="secondary" />
    </q-inner-loading>
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
const showSolution = ref(false)
const solution = ref('')
const progress = computed(() => {
  return amountOfVerbs.value != 0
    ? ((100 / amountOfVerbs.value) * currentVerbIndex.value) / 100
    : 0
})

const next = () => {
  // first show solution...
  if (!showSolution.value) {
    showSolution.value = true

    return
  }
  // ...if solution is already shown, go to next word
  else if (currentVerbIndex.value < amountOfVerbs.value) {
    currentVerbIndex.value++
    solution.value = ''
  }
  showSolution.value = false
}
</script>
