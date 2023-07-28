<template>
  <q-page>
    <q-card
      flat
      class="wordler-card absolute fit hide-scrollbar no-scroll"
      square
      v-if="progress !== 1 && amountOfVerbs !== 0"
    >
      <q-linear-progress :value="progress" />
      <q-card-section class="text-h5 scroll fit absolute wordler-card-section">
        <div v-if="!showSolution" class="row fit">
          <div class="col self-end">
            {{ currentVerb.grundform }}
          </div>
        </div>
        <div v-if="showSolution" class="row fit">
          <div class="col-md self-end">
            <div>{{ currentVerb.prasens }}</div>
            <div>{{ currentVerb.prateritum }}</div>
            <div>{{ currentVerb.perfekt }}</div>
          </div>
          <div class="col-md self-end">
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
          clearable
          :error="!solutionCorrect"
          :readonly="showSolution"
          hide-bottom-space
          square
          color="secondary"
          v-model="solution"
          label="Dare to type the solution?"
          no-error-icon
          @keyup.enter="next"
        />
        <q-btn
          size="lg"
          square
          color="primary"
          :label="!showSolution ? 'show solution' : 'next'"
          @click="next"
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
import { useQuasar } from 'quasar'
const $q = useQuasar()

const sheetsStore = useSheetStore()

sheetsStore.fetchSheet()

const verben = computed(() => sheetsStore.verben)
const amountOfVerbs = computed(() => verben.value.length || 0)
const currentVerbIndex = ref(0)
const currentVerb = computed(() => verben.value[currentVerbIndex.value])
const showSolution = ref(false)
const solution = ref('')
const solutionCorrect = ref(true)
const progress = computed(() => {
  return amountOfVerbs.value != 0
    ? ((100 / amountOfVerbs.value) * currentVerbIndex.value) / 100
    : 0
})

const next = () => {
  // first show solution...
  if (!showSolution.value) {
    showSolution.value = true
    checkIfSolutionIsCorrect()

    return
  }
  // ...if solution is already shown, go to next word
  else if (currentVerbIndex.value < amountOfVerbs.value) {
    currentVerbIndex.value++
    solution.value = ''
    solutionCorrect.value = true
  }
  showSolution.value = false
}

const checkIfSolutionIsCorrect = () => {
  if (solution.value === currentVerb.value.prasens) {
    solutionCorrect.value = true
    $q.notify({
      color: 'positive',
      message: 'Correct',
      icon: 'check',
      position: 'right',
    })
  } else if (solution.value !== '') {
    solutionCorrect.value = false

    $q.notify({
      color: 'negative',
      message: 'Wrong',
      icon: 'close',
      position: 'right',
    })
  }
}
</script>
