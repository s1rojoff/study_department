<script setup>
import { storeToRefs } from "pinia";
import BaseTable from "../components/BaseTable.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseModal from "../components/BaseModal.vue";
import BaseInput from '../components/BaseInput.vue'
import { useStore } from "../store/main";
import { useDepartment } from "./composable";
const { getAllDepartments,postDepartment, deleteDepartment, updateDepartment, searchDepartmentFunc } = useDepartment();
const store = useStore();
const { isOpenDepartmentModal, toggleDepartmentModal, department } = store;
function selectedItemDelete(data){
  deleteDepartment(data)
}
function selectedItemUpdate(data){
  updateDepartment(data)
  deleteDepartment(data)
}
storeToRefs(store);
</script>
<template>
  <main class="home-page">
    <BaseModal
      @cancelModal="toggleDepartmentModal"
      @closeModal="toggleDepartmentModal"
      @sendData="postDepartment"
      v-if="store.isOpenDepartmentModal"
    >
    <template #modalContent>
        <p class="mb-3 text-xl font-semibold">Create</p>
        <BaseInput v-model="store.department" label="Name"/>
    </template>
    </BaseModal>
    <div class="p-5">
      <div class="flex items-center justify-between">
        <p class="text-3xl">Department</p>
        <div class="flex items-center gap-2">
          <BaseInput
            v-model.trim="store.$state.searchDepartment"
            @input="searchDepartmentFunc(store.$state.searchDepartment)"
            type="search"
            label=""
          />
          <BaseButton btn-text="search" @click="searchDepartmentFunc(store.$state.searchDepartment)"/>
        </div>
        <BaseButton btn-text="create" @click="toggleDepartmentModal" />
      </div>
      <div class="mt-5">
        <BaseTable
          @deleteItem="selectedItemDelete"
          @editItem="selectedItemUpdate"
          v-if="store.departmentHeader.length"
          :table-header="store.departmentHeader"
          :table-body="store.searchDepartments.length ? store.searchDepartments : store.departmentBody"
        />
        <p
          v-if="!store.departmentHeader.length"
          class="text-center text-5xl mt-20"
        >
          This table is empty
        </p>
      </div>
    </div>
  </main>
</template>
