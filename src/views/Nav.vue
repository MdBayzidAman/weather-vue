<script setup>
import { ref } from 'vue';
import {uid} from 'uid'
import { RouterLink, useRoute, useRouter } from 'vue-router';
import BaseModel from '../components/BaseModel.vue';

const modelActive = ref(null);
const toggleModel=()=>{
    modelActive.value=!modelActive.value;
}

// add city
const route = useRoute();
const router = useRouter();
const savedCity =ref([]);
const addCity = ()=>{
    if (localStorage.getItem('savedCity')) {
        savedCity.value = JSON.parse(
            localStorage.getItem('savedCity')
        );
    }

    const locationObj = {
        id: uid(),
        state: route.params.state,
        city: route.params.city,
        coords: {
            lat: route.query.lat,
            lon :  route.query.lon,
        }
    }

    savedCity.value.push(locationObj);
    // save to local storage
    localStorage.setItem(
        "savedCity",
        JSON.stringify(savedCity.value)
    )
    // update url
    let query = Object.assign({}, route.query);
    delete query.preview;
    query.id = locationObj.id;
    router.replace({query});
}
</script>

<template >
    <header class="sticky bg-primary shadow-lg">
        <nav class="container flex flex-col sm:flex-row items-center text-white gap-4 py-6">
            <RouterLink :to="{name:'home'}">
                <div class="flex gap-3 flex-1 items-center">
                    <i class="fa-solid fa-sun text-2xl"></i>
                    <p class="text-2xl">The local weather.</p>
                </div>
            </RouterLink>
            <div class="flex gap-3 flex-1 justify-end">
                <i @click="toggleModel" class="fa-solid fa-circle-info text-2xl hover:text-secondary duration-200 cursor-pointer"></i>
                <i @click="addCity" v-if="route.query.preview" class="fa-solid fa-plus text-2xl hover:text-secondary duration-200 cursor-pointer"></i>
            </div>
        </nav>
        <BaseModel :modelActive="modelActive" @hideModel="toggleModel">
            <div class="text-black">
            <h1 class="text-2xl mb-1">About:</h1>
            <p class="mb-4">
                The Local Weather allows you to track the current and
                future weather of cities of your choosing.
            </p>
            <h2 class="text-2xl">How it works:</h2>
            <ol class="list-decimal list-inside mb-4">
                <li>
                Search for your city by entering the name into the
                search bar.
                </li>
                <li>
                Select a city within the results, this will take
                you to the current weather for your selection.
                </li>
                <li>
                Track the city by clicking on the "+" icon in the
                top right. This will save the city to view at a
                later time on the home page.
                </li>
            </ol>

            <h2 class="text-2xl">Removing a city</h2>
            <p>
                If you no longer wish to track a city, simply select
                the city within the home page. At the bottom of the
                page, there will be am option to delete the city.
            </p>
            </div>
        </BaseModel>
    </header>
</template>
