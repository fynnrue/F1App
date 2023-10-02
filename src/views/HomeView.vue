<template>
    <div class="wrapper text-center">
        <div class="choseCategory">
            <q-btn
                class="categoryButton"
                v-model="categoryToggle"
                :label="categoryToggle ? 'Drivers' : 'Constructors'"
                @click="toggleCategory"
            />
        </div>
        <div class="scrollAreaWrapper">

            <!--Drivers-->
            <q-scroll-area style="height: 100vh; width: 80vw; margin: 0 auto;" v-if="categoryToggle">
                <div class="driverCardsContainer" style="padding-bottom: 30vh;">
                    <div v-for="i in 20" class="driverCard">
                        <div class="driverInfo">
                            <q-avatar class="avatar">
                                <img src="https://cdn.quasar.dev/img/avatar.png" />
                            </q-avatar>
                            <div class="driverInfoDetail">
                                <div class="name">Name: Max Verstappen</div>
                                <div class="age">Age: 23</div>
                                <div class="team">Team: RedBull</div>
                            </div>
                        </div>
                        <div class="driverStats">driver {{ i }}</div>
                    </div>
                </div>
            </q-scroll-area>

            <!--Constructors-->
            <q-scroll-area style="height: 100vh; width: 80vw; margin: 0 auto;" v-if="!categoryToggle">
                <div class="driverCardsContainer" style="padding-bottom: 30vh;">
                    <div v-for="i in 10" class="driverCard">
                        <div class="driverInfo">
                            <q-avatar class="avatar">
                                <img src="https://cdn.quasar.dev/img/avatar.png" />
                            </q-avatar>
                            <div class="driverInfoDetail">
                                <div class="team">Name: Red Bull</div>
                                <div class="driver">Driver 1: Max Verstappen</div>
                                <div class="driver">Driver 2: Sergio Perez</div>
                            </div>
                        </div>
                        <div class="driverStats">team {{ i }}</div>
                    </div>
                </div>
            </q-scroll-area>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DriverDrawer from "@/components/DriverDrawer.vue";

export default defineComponent({
    name: "HomeView",
    components: {
        DriverDrawer,
    },
    setup() {
        const categoryToggle = ref(true);

        function toggleCategory() {
            categoryToggle.value = !categoryToggle.value;
        }

        return {
            categoryToggle,
            toggleCategory,
        };
    },
});
</script>

<style scoped>
.wrapper {
    justify-content: center;
    align-items: center;
}

.categoryButton {
    background-color: #021421;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 10px;
    margin-bottom: 30px;
    margin-top: 20px;
    width: 300px;
}

.scrollAreaWrapper {
    display: flex;
    justify-content: center;
}

.driverCardsContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 100vh;
}

.driverCard {
    height: 200px;
    width: 300px;
    background-color: #021421;
    margin: 10px;
    border: 2px solid #fff;
    border-radius: 10px;
    text-align: center;

    display: grid;
    grid-template-rows: min-content 1fr;
}

.driverInfo {
    display: grid;
    grid-template-columns: 20% 80%;
    justify-items: end;
    padding: 5px;

    border-bottom: 2px solid #fff;
}

.avatar {
    grid-column: 1;
    height: 50px;
    width: 50px;
}

.driverInfoDetail {
    grid-column: 2;
    text-align: end;
}
</style>