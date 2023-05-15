<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import BaseTable from "../components/BaseTable.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseModal from "../components/BaseModal.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseSelect from "../components/BaseSelect.vue";
import { useStore } from "../store/main";
import { useTeacher } from "./composable";
const { getAllTeachers, postTeacher, deleteTeacher, getDepartmentName, updateTeacher, searchTeacher} = useTeacher();
const store = useStore();
const { isOpenTeacherModal, toggleTeacherModal } = store;
onMounted(() => {
  getAllTeachers();
});
function selectedItemDelete(index) {
  deleteTeacher(index);
}
function selectedItemUpdate(index){
  updateTeacher(index)
}
function changeItem(event) {
  store.$state.teacher.id_department = event.target.value * 1;
}
function getDepartmentAndOpenModal() {
  getDepartmentName()
  toggleTeacherModal();
}
storeToRefs(store);
</script>
<template>
  <main class="home-page">
    <BaseModal
      v-if="store.isOpenTeacherModal"
      @closeModal="toggleTeacherModal"
      @cancelModal="toggleTeacherModal"
      @sendData="postTeacher"
    >
      <template #modalContent>
        <p class="mb-3 text-xl font-semibold">{{ store.isUpdateTeacher ? 'Update' : 'Create' }}</p>
        <BaseInput v-model="store.teacher.ful_name" label="Name" />
        <div class="flex item-center gap-4 mt-2">
          <BaseInput v-model="store.teacher.email" label="Email" />
          <BaseInput v-model="store.teacher.phone" label="Phone" />
        </div>
        <div class="flex items-center gap-4 mt-2">
          <BaseInput
            v-model="store.teacher.password"
            label="password"
            type="password"
          />
          <BaseInput
            class="w-1/2"
            v-model="store.teacher.dateofbirth"
            label="Data of birthday"
            type="date"
          />
        </div>
        <div class="flex item-center gap-4 mt-2">
          <BaseInput v-model="store.teacher.address" label="Address" />
          <BaseInput v-model="store.teacher.position" label="Position" />
        </div>
        <div class="flex item-center gap-4 mt-2">
          <BaseInput v-model="store.teacher.category" label="Category" />
          <BaseInput
            v-model="store.teacher.type_employment"
            label="Type employment"
          />
        </div>
        <div class="flex item-center gap-4 mt-2">
          <BaseInput v-model="store.teacher.status" label="Status" />
          <BaseSelect
            @change="changeItem($event)"
            label="Department"
            class="w-1/2"
            v-model="store.teacher.id_department"
            :data="store.$state.teacherDepartmentName"
          />
        </div>
      </template>
    </BaseModal>
    <div class="p-5">
      <div class="flex items-center justify-between">
        <p class="text-3xl">Teacher</p>
        <div class="flex items-center gap-2">
          <BaseInput
            v-model.trim="store.$state.searchTeacher"
            @input="searchTeacher(store.$state.searchTeacher)"
            type="search"
            label=""
          />
          <BaseButton btn-text="search" @click="searchTeacher(store.$state.searchTeacher)"/>
        </div>
        <BaseButton btn-text="create" @click="getDepartmentAndOpenModal" />
      </div>
      <div class="mt-5">
        <BaseTable
          v-if="store.teacherHeader.length"
          @deleteItem="selectedItemDelete"
          @editItem="selectedItemUpdate"
          :table-header="store.teacherHeader"
          :table-body="store.$state.searchTeachers.length ? store.$state.searchTeachers :store.teacherBody"
        />
        <p
          v-if="!store.teacherHeader.length"
          class="text-center text-5xl mt-20"
        >
          This table is empty
        </p>
      </div>
    </div>
  </main>
</template>
