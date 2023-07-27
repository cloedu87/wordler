<template>
  <q-item
    v-if="link.startsWith('http')"
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon size="sm" :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-item v-if="!link.startsWith('http')" clickable :to="link">
    <q-item-section v-if="icon" avatar>
      <q-icon size="sm" :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>
