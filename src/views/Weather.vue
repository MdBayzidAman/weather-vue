<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <div class="flex text-white justify-center">
          <div class="py-2 px-8 bg-secondary rounded-md mt-60 self-center ">
            Loading . . .
          </div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
</script>

<style scoped></style>
