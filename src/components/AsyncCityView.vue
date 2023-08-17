<template>
  <div class="flex flex-1 flex-col items-center">
    <!-- banner -->
    <div v-if="route.query.preview" class="text-white bg-secondary p-4 w-full text-center">
      <p>You are now in preview mode. Click "+" icon to start tracking this city.</p>
    </div>
    <!-- weather overview-->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="mb-2 text-4xl">{{ route.params.city }}</h1>
      <p class="mb-12 text-sm">{{ new Date(weatherInfo.data.currentTime).toLocaleString() }}</p>  
      <p class="mb-8 text-8xl">{{ Math.round(weatherInfo.data.main.temp)}}&deg;</p>  
      <p> Feels like {{ Math.round(weatherInfo.data.main.feels_like)}}&deg;</p>  
      <p class="capitalize">{{ weatherInfo.data.weather[0].description}}</p>  
      <img class=" w-[150px] h-auto" :src="`http://openweathermap.org/img/wn/${weatherInfo.data.weather[0].icon}@2x.png`" alt="">
    </div>
    <!-- Remove city -->
    <div @click="removeCity" v-if="!route.query.preview" class="flex gap-2 items-center hover:text-red-600 text-white py-6 cursor-pointer duration-150">
      <i class="fa-solid fa-trash"></i>
      <p>Remove city</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";


const router = useRouter();
const removeCity =()=>{
  const cities = JSON.parse(localStorage.getItem("savedCity"));
  const updateCity = cities.filter((e)=>
    e.id!==route.query.id
  )
  console.log(updateCity.id);
  console.log(cities);
  localStorage.setItem(
    "savedCity",
    JSON.stringify(updateCity)
  )
  router.push({
    name:"home"
  })

}

// GET WEATHER DATA FOR WEATHER VIEW PAGE
const route = useRoute();
const apiKey = '8a6d428738552b401f702f948ad0ceef';
// const lat = route.query.lat;
// const lon = route.query.lon;

console.log(route.query.lat);
console.log(route.query.lon);
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lon}&appid=${apiKey}&units=imperial&exclude=hourly,daily`
    );
    // const weatherData = await axios.get(
    //   `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    // );
    console.log(weatherData);
    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone;
    // cal hourly weather offset
    // weatherData.data.hourly.forEach((hour) => {
    //   const utc = hour.dt * 1000 + localOffset;
    //   hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    // });

    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

const weatherInfo = await getWeatherData();
console.log(weatherInfo);

</script>
