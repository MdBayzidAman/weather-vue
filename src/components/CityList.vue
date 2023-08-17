<template>
    <div v-for="(cityData, index) in savedCity" :key="cityData.id">
        <CityCard :city="cityData" @click="gotoCityView(cityData)" />
    </div>
    <p v-if="savedCity.length===0">
        No location added. To start tracking a location, search in the field above.
    </p>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import CityCard from './CityCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const gotoCityView = (e) =>{
    router.push({
        name:'weather',
        params:{
            state: e.state,
            city: e.city,
        },
        query:{
            id: e.id,
            lat: e.coords.lat,
            lon: e.coords.lon
        }
    })
}


//  ADD LOCAL STORAGE FOR TRACKING
const savedCity= ref([])
const getCity = async () =>{
    if (localStorage.getItem("savedCity")) {
        savedCity.value = JSON.parse(
            localStorage.getItem("savedCity")
        )
    }
    const tem = []
    savedCity.value.forEach((e)=>{
        tem.push(
            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${e.coords.lat}&lon=${e.coords.lon}&appid=8a6d428738552b401f702f948ad0ceef&units=imperial`
            )
        )
    })

    const weatherData = await Promise.all(tem);
    weatherData.forEach((value, index)=>{
        savedCity.value[index].weather = value.data;
    })
}
await getCity();
console.log(savedCity);
</script>

<style scoped>
    
</style>