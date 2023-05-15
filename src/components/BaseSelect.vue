<script setup>
const props =defineProps({
    data:{
        type: Object,
        default: []
    },
    label: {
        type: String,
        defailt: ''
    }
}) 
</script>

<template>
  <div>
    <p class="text-xs w-full">{{ props.label}}</p>
    <select class="border rounded-md w-full py-0.5 px-1.5 outline-none mt-0.5"
    @change="$emit('input', $event.target.value)">
    <option disabled selected value="test">Select item</option>
      <option
        v-for="item in props.data"
        :key="item.id"
        :value="item.id"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>
