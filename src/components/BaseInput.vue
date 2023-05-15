<script setup>
defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "name",
  },
  type:{
type:String,
default: 'text'
  }
});
</script>

<template>
  <div>
    <p class="text-xs w-full">{{ props.label }}</p>
    <input
      :value="modelValue"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
      class="border rounded-md w-full py-0.5 px-1.5 outline-none mt-0.5"
    />
  </div>
</template>
