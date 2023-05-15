<script setup>
const emits = defineEmits(['deleteItem', 'editItem'])
const props = defineProps({
  tableHeader: {
    type: Array,
    default: [],
  },
  tableBody: {
    type: Array,
    default: [],
  },
});
</script>
<template>
  <div class="w-full border h-auto bg-white rounded-md overflow-hidden">
    <div
      :class="`grid-cols-${props.tableHeader.length-1}`"
      class="grid text-center pl-3 bg-[#64748b] text-white pt-3 pb-1.5"
    >
      <span
        class="text-sm first:hidden"
        v-for="(item, index) in props.tableHeader"
        :key="index"
        >{{ item }}</span
      >
    </div>
    <div>
      <div
        v-for="(data, indexParent) in props.tableBody"
        :key="indexParent"
        :class="`grid-cols-${props.tableHeader.length-1}`"
        class="grid hover:bg-gray-100 text-center transition pl-3 text-black pt-3 pb-1.5"
      >
        <span class="text-sm first:hidden" v-for="(item, index) in data" :key="index">{{
          item
        }}</span>
        <span class="text-sm">
          <span
            @click="$emit('deleteItem', data.id)"
            class="material-icons text-base text-red-500 cursor-pointer"
            >delete</span
          >
          <span
            @click="$emit('editItem', data.id)"
            class="material-icons text-base ml-5 cursor-pointer"
            >edit</span
          >
        </span>
      </div>
    </div>
  </div>
</template>
