<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import BaseTable from "../components/BaseTable.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseModal from "../components/BaseModal.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseSelect from "../components/BaseSelect.vue";
import { useStore } from "../store/main";
import { useGroup } from "./composable";
const { postGroups, deleteGroup, updateGroup,searchTeacherFunc } = useGroup();
const store = useStore();
const { toggleGroupModal } = store;
function deleteSelectedItem(data) {
  deleteGroup(data);
}
function updateSelectedItem(data) {
  updateGroup(data);
}
function changeItem(event) {
  store.$state.group.group_kurator = event.target.value * 1;
}
function changeItemSecond(event){
  store.$state.group.id_department = event.target.value * 1;
}
storeToRefs(store);
</script>
<template>
  <main class="home-page">
    <BaseModal
      v-if="store.isOpenGroupModal"
      @closeModal="toggleGroupModal"
      @sendData="postGroups"
      @cancelModal="toggleGroupModal"
    >
      <template #modalContent>
        <p class="mb-3 text-xl font-semibold">
          {{ store.$state.isUpdateGroup ? "Update" : "Create" }}
        </p>
        <BaseInput v-model="store.$state.group.name" label="Name" />
        <div class="w-full flex item-center gap-4 mt-2">
          <BaseSelect
            @change="changeItem($event)"
            v-model="store.$state.group.group_kurator"
            class="w-1/2"
            :data="store.groupCuratorName"
            label="Group kurator"
          />
          <BaseSelect
            @change="changeItemSecond($event)"
            v-model="store.$state.group.id_department"
            class="w-1/2"
            :data="store.groupDepartmentName"
            label="Department"
          />
        </div>
      </template>
    </BaseModal>
    <div class="p-5">
      <div class="flex items-center justify-between">
        <p class="text-3xl">Group</p>
        <div class="flex items-center gap-2">
          <BaseInput
            v-model.trim="store.$state.searchGroup"
            @input="searchTeacherFunc(store.$state.searchGroup)"
            type="search"
            label=""
          />
          <BaseButton btn-text="search" @click="searchTeacherFunc(store.$state.searchGroup)"/>
        </div>
        <BaseButton btn-text="create" @click="toggleGroupModal" />
      </div>
      <div class="mt-5">
        <BaseTable
          v-if="store.groupHeader.length"
          @deleteItem="deleteSelectedItem"
          @editItem="updateSelectedItem"
          :table-header="store.groupHeader"
          :table-body="store.searchGroups.length ? store.searchGroups : store.groupBody"
        />
        <p v-if="!store.groupHeader.length" class="text-center text-5xl mt-20">
          This table is empty
        </p>
      </div>
    </div>
  </main>
</template>
