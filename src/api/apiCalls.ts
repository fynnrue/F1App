import axios from 'axios';

const F1API = "http://ergast.com/api/f1/";

export default {
    getDriverStandingsYear,
    getConstructorStandingsYear
};

// fetch driver standings for a given year
function getDriverStandingsYear(year: number) {
    const url = F1API + year + "/driverStandings.json";

    return axios.get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}

// fetch constructor standings for a given year
function getConstructorStandingsYear(year: number) {
    const url = F1API + year + "/constructorStandings.json";

    return axios.get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}
