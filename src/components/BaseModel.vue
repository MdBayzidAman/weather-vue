<template>
  <Teleport to="body">
      <Transition name="modal-outer">
        <div v-show="modelActive"
          class="absolute left-0 top-0 justify-center bg-black bg-opacity-20 px-8 w-full h-screen flex"
        >
          <Transition name="modal-inner">
            <div v-if="modelActive" class="p-4 bg-white self-start mt-32 max-w-screen-md">
              <slot />
              <button
                @click="$emit('hideModel')"
                class="text-white py-2 mt-8 bg-primary rounded-sm px-6"
              >
                Close
              </button>
            </div>
          </Transition>
        </div>
      </Transition>
  </Teleport>
</template>

<!-- script -->
<script setup>

defineEmits(["hideModel"]);
defineProps({
  modelActive: {
    type: Boolean,
    default: false,
  },
});

</script>

<!-- style  -->
<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
