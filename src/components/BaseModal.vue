<script setup>
import BaseButton from "./BaseButton.vue";
const emits = defineEmits(['closeModal', 'cancelModal', 'sendData'])
const props = defineProps({
})
</script>
<template>
  <div class="flex relative justify-between">
    <div class="bg-black fixed h-screen opacity-70 w-2/3" @click="$emit('closeModal')"></div>
    <div class="bg-white fixed w-1/3 p-4 h-screen right-0 top-0">
   <slot name="modalContent"></slot>
      <div class="absolute bottom-5 right-4">
        <BaseButton @click="$emit('cancelModal')" class="mr-5" btn-text="cancel"/>
        <BaseButton @click="$emit('sendData')" btn-text="save" />
      </div>
    </div>
  </div>
</template>
