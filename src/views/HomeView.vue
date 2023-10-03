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
        const period = ref(new Date().getFullYear());

        function toggleCategory() {
            categoryToggle.value = !categoryToggle.value;
        }

        return {
            categoryToggle,
            toggleCategory,
            period
        };
    },
});
</script>

<template>
    <div class="wrapper text-center">
        <div class="optionWrapper">
            <div class="choosePeriod">
                <q-input 
                    rounded outlined dense
                    dark
                    label-color="white"
                    color="white"
                    v-model="period"
                    type="number"
                    mask="####"
                    :rules="[
                        val => val >= 1950 || 'Year must be after 1950',
                        val => val <= new Date().getFullYear() || 'Year must be before current year',
                    ]"
                    lazy-rules
                />
            </div>
            <div class="choseCategory">
                <q-btn class="categoryButton" v-model="categoryToggle" :label="categoryToggle ? 'Drivers' : 'Constructors'"
                    @click="toggleCategory" />
            </div>
        </div>

        <div class="scrollAreaWrapper">

            <!--Drivers-->
            <q-scroll-area style="height: 100vh; width: 80vw; margin: 0 auto;" v-if="categoryToggle">
                <div class="cardsContainer" style="padding-bottom: 30vh;">
                    <div v-for="i in 22" class="card">
                        <div class="driverInfo">
                            <q-avatar class="avatar">
                                <img src="https://cdn.quasar.dev/img/avatar.png" />
                            </q-avatar>
                            <div class="infoDetail">
                                <div class="name">Name: Max Verstappen</div>
                                <div class="age">Age: 23</div>
                                <div class="team">Team: RedBull</div>
                            </div>
                        </div>
                        <div class="stats">
                            <div class="amntDriven stat">Races: 10</div>
                            <div class="amntPodiums stat">Podiums: 1</div>
                            <div class="amntWins stat">Wins: 1</div>
                            <div class="amntPoints stat">Points: 35</div>
                        </div>
                    </div>
                </div>
            </q-scroll-area>

            <!--Constructors-->
            <q-scroll-area style="height: 100vh; width: 80vw; margin: 0 auto;" v-if="!categoryToggle">
                <div class="cardsContainer" style="padding-bottom: 30vh;">
                    <div v-for="i in 10" class="card">
                        <div class="driverInfo">
                            <q-avatar class="avatar">
                                <img src="https://cdn.quasar.dev/img/avatar.png" />
                            </q-avatar>
                            <div class="infoDetail">
                                <div class="team">Name: Red Bull</div>
                                <div class="driver">Driver 1: Max Verstappen</div>
                                <div class="driver">Driver 2: Sergio Perez</div>
                            </div>
                        </div>
                        <div class="stats">
                            <div class="amntPoints stat">Points: 100</div>
                        </div>
                    </div>
                </div>
            </q-scroll-area>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    justify-content: center;
    align-items: center;
}

.optionWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}

.choosePeriod {
    color: #fff;
    width: 300px;
    height: 40px;
}

.categoryButton {
    background-color: #021421;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 10px;
    margin-bottom: 30px;
    margin-top: 20px;
    width: 300px;
    height: 40px;
}

.scrollAreaWrapper {
    display: flex;
    justify-content: center;
}

.cardsContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 100vh;
}

.card {
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

.infoDetail {
    grid-column: 2;
    text-align: end;
}

.stats {
    text-align: justify;
    padding-inline: 5px;
}

.stat::after {
    content: "";
    display: inline-block;
    width: 100%;
}

.stat {
    width: 100%;
    max-height: 20px;
}
</style>