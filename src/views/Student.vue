<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import BaseTable from "../components/BaseTable.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseModal from "../components/BaseModal.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseSelect from "../components/BaseSelect.vue";
import { useStudent } from "./composable";
import { useStore } from "../store/main";
const store = useStore();
const { isOpenStudentModal, toggleStudentModal } = store;
const {
  postStudent,
  getGroupName,
  deleteStudent,
  updateStudent,
  searchStudent,
} = useStudent();
function selectedItemDelete(index) {
  deleteStudent(index);
}
function updateSelectedStudent(data) {
  updateStudent(data);
}
function sendData() {
  if (store.isPostStudent) {
    postStudent();
  } else {
    updateSelectedStudent();
  }
}

function changeItem(event) {
  store.$state.student.id_group = event.target.value * 1;
}
function getGroupAndOpenModal() {
  getGroupName();
  toggleStudentModal();
}
storeToRefs(store);
</script>
<template>
  <main class="home-page">
    <BaseModal
      @cancelModal="toggleStudentModal"
      @sendData="sendData"
      @closeModal="toggleStudentModal"
      v-if="store.isOpenStudentModal"
    >
      <template #modalContent>
        <p class="mb-3 text-xl font-semibold">Create</p>
        <BaseInput v-model="store.$state.student.ful_name" label="Name" />
        <div class="flex justify-between gap-4 mt-3 items-center w-full">
          <BaseInput
            v-model="store.$state.student.email"
            class="w-1/2"
            label="Email"
          />
          <BaseInput
            v-model="store.$state.student.phone"
            class="w-1/2"
            label="Phone"
          />
        </div>
        <div class="flex justify-between mt-3 gap-4 items-center w-full">
          <BaseInput
            v-model="store.$state.student.password"
            class="w-1/2"
            :type="'password'"
            label="Password"
          />
          <BaseInput
            v-model="store.$state.student.dateofbirth"
            :type="'date'"
            class="w-1/2"
            label="Date of birth"
          />
        </div>
        <div class="flex justify-between gap-4 mt-3 items-center w-full">
          <BaseInput
            v-model.number="store.$state.student.cours_number"
            class="w-1/2"
            label="Course number"
          />
          <BaseInput
            v-model="store.$state.student.status"
            class="w-1/2"
            label="Satus"
          />
        </div>
        <div class="flex justify-between gap-4 mt-3 items-center w-full">
          <BaseInput
            v-model="store.$state.student.address"
            class="w-1/2"
            label="Address"
          />
          <BaseSelect
            @change="changeItem($event)"
            v-model="store.$state.student.id_group"
            class="w-1/2"
            label="Group name"
            :data="store.$state.studentGroupName"
          />
        </div>
      </template>
    </BaseModal>
    <div class="p-5">
      <div class="flex items-center justify-between">
        <p class="text-3xl">Student</p>
        <div class="flex items-center gap-2">
          <BaseInput
            v-model.trim="store.$state.searchStudent"
            @input="searchStudent(store.$state.searchStudent)"
            type="search"
            label=""
          />
          <BaseButton btn-text="search" @click="searchStudent(store.$state.searchStudent)"/>
        </div>
        <BaseButton btn-text="create" @click="getGroupAndOpenModal" />
      </div>
      <div class="mt-5">
        <BaseTable
          v-if="store.studentHeader.length"
          @deleteItem="selectedItemDelete"
          @editItem="updateSelectedStudent"
          :table-header="store.studentHeader"
          :table-body="store.searchStudents.length ? store.searchStudents : store.studentBody"
        />
        <p
          v-if="!store.studentHeader.length"
          class="text-center text-5xl mt-20"
        >
          This table is empty
        </p>
      </div>
    </div>
  </main>
</template>
