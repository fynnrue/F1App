<script lang="ts">
import { defineComponent, watch, ref, onMounted } from "vue";
import DriverDrawer from "@/components/DriverDrawer.vue";
import api from "@/api/apiCalls";
import type { Driver } from "@/types/driver";
import type { Constructor } from "@/types/constructor";

export default defineComponent({
    name: "HomeView",
    components: {
        DriverDrawer,
    },
    setup() {
        const categoryToggle = ref(true);
        const period = ref(new Date().getFullYear());
        const drivers = ref<Driver[]>([]);
        const constructors = ref<Constructor[]>([]);

        // change category between drivers and constructors overview
        function toggleCategory() {
            categoryToggle.value = !categoryToggle.value;
        }

        // calculate age from date of birth
        function calcAge(dateString: string) {
            var birthday = +new Date(dateString);
            return ~~((Date.now() - birthday) / 31557600000);
        }

        // fetch all drivers of a given year
        function getAllDriversYear() {
            const year = period.value;
            if (year < 1950 || year > new Date().getFullYear()) return;
            
            const response = api.getDriverStandingsYear(year);
            response.then((res) => {
                const MRData = res.MRData;

                drivers.value = MRData.StandingsTable.StandingsLists[0].DriverStandings.map((driverData: any) => ({
                    code: driverData.Driver.code,
                    firstName: driverData.Driver.givenName,
                    lastName: driverData.Driver.familyName,
                    nationality: driverData.Driver.nationality,
                    team: driverData.Constructors[0].name,
                    num: driverData.permanentNumber,
                    age: calcAge(driverData.Driver.dateOfBirth),
                    position: driverData.position,
                    points: driverData.points,
                    wins: driverData.wins,
                }));

                drivers.value.sort((a, b) => a.position - b.position);
            });
        }

        // fetch all constructors of a given year
        function getAllConstructorsYear() {
            const year = period.value;
            if (year < 1950 || year > new Date().getFullYear()) return;

            const response = api.getConstructorStandingsYear(year);
            response.then((res) => {
                const MRData = res.MRData;

                constructors.value = MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map((constructorData: any) => ({
                    id: constructorData.Constructor.constructorId,
                    name: constructorData.Constructor.name,
                    nationality: constructorData.Constructor.nationality,
                    position: constructorData.position,
                    points: constructorData.points,
                    wins: constructorData.wins
                }));

                constructors.value.sort((a, b) => a.position - b.position);
            });
        }

        watch(period, () => {
            getAllDriversYear();
            getAllConstructorsYear();
        });

        onMounted(() => {
            getAllDriversYear();
            getAllConstructorsYear();
        });

        return {
            categoryToggle,
            toggleCategory,
            period,
            drivers,
            constructors
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
                    <div class="card" v-for="(driver) in drivers">
                        <div class="driverInfo">
                            <q-avatar class="avatar">
                                <img src="https://cdn.quasar.dev/img/avatar.png" />
                            </q-avatar>
                            <div class="infoDetail">
                                <div class="name">Name: {{ driver.firstName }} {{ driver.lastName }}</div>
                                <div class="nationality">Nationality: {{ driver.nationality }}</div>
                                <div class="age">Age: {{ driver.age }}</div>
                                <div class="team">Team: {{ driver.team }}</div>
                            </div>
                        </div>
                        <div class="stats">
                            <div class="amntWins stat">Wins: {{ driver.wins }}</div>
                            <div class="amntPoints stat">Points: {{ driver.points }}</div>
                            <div class="position stat">Position: {{ driver.position }}</div>
                        </div>
                    </div>
                </div>
            </q-scroll-area>

            <!--Constructors-->
            <q-scroll-area style="height: 100vh; width: 80vw; margin: 0 auto;" v-if="!categoryToggle">
                <div class="cardsContainer" style="padding-bottom: 30vh;">
                    <div v-for="team in constructors" class="card">
                        <div class="driverInfo">
                            <q-avatar class="avatar">
                                <img src="https://cdn.quasar.dev/img/avatar.png" />
                            </q-avatar>
                            <div class="infoDetail">
                                <div class="team">Name: {{ team.name }}</div>
                                <div class="team">Nationality: {{ team.nationality }}</div>
                            </div>
                        </div>
                        <div class="stats">
                            <div class="amntWins stat">Wins: {{ team.wins }}</div>
                            <div class="amntPoints stat">Points: {{ team.points }}</div>
                            <div class="position stat">Position: {{ team.position }}</div>
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