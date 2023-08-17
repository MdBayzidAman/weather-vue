<template>
  <main class="container text-white">
    <div class="mt-4 mb-8 relative">
      <input
        class="py-2 px-1 bg-transparent w-full border-b focus:border-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004e71]"
        type="text"
        placeholder="Search for a city"
        v-model="searchQuiry"
        @input="getSearchResult"
      />

      <!-- Search Result -->
      <ul
        v-if="SearchResult"
        class="absolute bg-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <p v-if="SearchError" class="py-3 text-center">
          Sorry, something went wrong. please try again leter.
        </p>
        <p v-if="!SearchError && !SearchResult.length" class="py-3 text-center">
          Location not found.
        </p>
        <template v-else>
          <li
            class="py-2 cursor-pointer"
            v-for="(searchresult, index) in SearchResult"
            :key="searchresult.id"
            @click="weatherPagePush(searchresult.properties)"
          >
            {{
              searchresult.properties.address_line1 +
              ", " +
              searchresult.properties.address_line2
            }}
          </li>
        </template>
      </ul>
    </div>

    <!-- Saved city -->
    <div class="flex flex-col gap-1">
      <Suspense>
        <CityList/>
        <template #fallback>
          <div class="flex text-white justify-center">
            <div class="py-2 px-8 bg-secondary rounded-md mt-60 self-center ">Loading . . .</div>
          </div>
        </template>
      </Suspense>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";

const router = useRouter();
const weatherPagePush = (e) => {
  console.log(e);
  router.push({
    name: "weather",
    params: { state: e.state.replaceAll(" ", ""), city: e.city },
    query: {
      lat: e.lat,
      lon: e.lon,
      preview: true,
    },
  });
};

const searchQuiry = ref("");
const apiKey = "7cb20e5324144f3bb9c87460df801f07";
const quiryTimeout = ref(null);
const SearchResult = ref(null);
const SearchError = ref(null);

const getSearchResult = () => {
  clearTimeout(quiryTimeout.value);
  quiryTimeout.value = setTimeout(async () => {
    if (searchQuiry.value !== "") {
      try {
        // const result = await axios.get(
        //   `https://geocode.maps.co/search?q=${searchQuiry.value}`
        // );
        const result = await axios.get(
          `https://api.geoapify.com/v1/geocode/search?text=${searchQuiry.value}&apiKey=${apiKey}&formet=json`
        );
        SearchResult.value = result.data.features;
        console.log(SearchResult.value);
      } catch {
        SearchError.value = true;
      }
      return;
    }
    SearchResult.value = null;
  }, 300);
};
</script>
<style></style>
