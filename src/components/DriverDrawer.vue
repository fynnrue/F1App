<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'DriverDrawer',
    components: {
    },
    setup() {
        const drawerShown = ref(false)
        const miniState = ref(true)

        return {
            drawerShown,
            miniState
        }
    }
})
</script>

<template>
    <q-drawer v-model="drawerShown" show-if-above :mini="miniState" @mouseover="miniState = false"
        @mouseout="miniState = true" :width="200" :breakpoint="500" bordered>
        <q-scroll-area class="fit">
            <q-list>
                <q-item v-for="i in 20" :key="i" clickable>
                    <q-item-section avatar>
                        <q-avatar>
                            <img src="https://cdn.quasar.dev/img/avatar.png">
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        Item {{ i }}
                    </q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>
    </q-drawer>
</template>

<style scoped>


.q-list {
    background-color: #021421;
    overflow-x: hidden;
}
</style>