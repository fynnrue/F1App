<script lang="ts">
import HelloWorld from './views/HomeView.vue'

export default {
  name: 'LayoutDefault',

  components: {
    HelloWorld
  },

  setup () {
    return {
    }
  }
}
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          F1 Stats
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <HelloWorld />
    </q-page-container>

    <q-footer elevated class="text-white">
      <q-toolbar>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<style scoped>
  @import './assets/main.css';

  .q-header {
    text-align: end;
  }

  .q-footer {
    background-color: #021421;
  }
</style>
