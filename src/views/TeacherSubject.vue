<script setup>
import { useStore } from "../store/main";
import { storeToRefs } from "pinia";
import { useTeacherSubject } from "../composables/teacherSubject";
import BaseButton from "../components/BaseButton.vue";
import BaseTable from "../components/BaseTable.vue";
import BaseModal from '../components/BaseModal.vue'
import BaseSelect from '../components/BaseSelect.vue'
const { postTeacherSubject, deleteTeacherSubject } = useTeacherSubject();
const store = useStore();
function changeItem(event) {
  store.$state.teacherSubject.id_teacher = event.target.value * 1;
}
function deleteSelectedItem(index){
  deleteTeacherSubject(index)
}
function changeItemSecond(event) {
  store.$state.teacherSubject.id_subject = event.target.value * 1;
}
storeToRefs(store)
</script>
<template>
  <main class="home-page">
    <BaseModal @closeModal="store.toggleTeacherSubjectModal" @sendData="postTeacherSubject" @cancelModal="store.toggleTeacherSubjectModal"
      v-if="store.$state.isOpenTeachSubModal">
      <template #modalContent>
        <div class="flex justify-between gap-4 items-center w-full">
          <BaseSelect class=" w-1/2" @change="changeItem($event)" label="Teacher name" :data="store.$state.teacherName"
            v-model="store.$state.teacherSubject.id_teacher" />
          <BaseSelect class=" w-1/2" @change="changeItemSecond($event)" label="Subject name" :data="store.$state.subjectName"
            v-model="store.$state.teacherSubject.id_subject" />
        </div>
      </template>
    </BaseModal>
    <div class="p-5">
      <div class="flex items-center justify-between">
        <p class="text-3xl">Subject Teacher</p>
        <BaseButton btn-text="create" @click="store.toggleTeacherSubjectModal" />
      </div>
      <div class="mt-5">
        <BaseTable @deleteItem="deleteSelectedItem" v-if="store.subjectTeacherHeader.length"
          :table-header="store.$state.subjectTeacherHeader" :table-body="store.subjectTeacherBody" />
        <p v-if="!store.subjectTeacherHeader.length" class="text-center text-5xl mt-20">
          This table is empty
        </p>
      </div>
    </div>
  </main>
</template>
