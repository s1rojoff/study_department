<script setup>
import { useStore } from "../store/main";
import { storeToRefs } from "pinia";
import { useSubject } from "../composables/subject";
import BaseButton from "../components/BaseButton.vue";
import BaseTable from "../components/BaseTable.vue";
import BaseModal from "../components/BaseModal.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseSelect from "../components/BaseSelect.vue";
const { deleteSubject,postSubject, updateSubject, searchSubjectFunc} = useSubject();
function deleteSelectedItem(data) {
  deleteSubject(data);
}
function editSelectedItem(data){
  updateSubject(data)
}
const store = useStore();
const { toggleSubjectModal} = store;
function changeItem(event) {
  store.$state.subject.id_department = event.target.value * 1;
}
function changeItemSecond(event){
  store.$state.subject.id_group = event.target.value * 1;
}
storeToRefs(store);
</script>
<template>
  <main class="home-page">
  <BaseModal
    @cancelModal="toggleSubjectModal"
    @closeModal="toggleSubjectModal"
    @sendData="postSubject"
    v-if="store.isOpenSubjectModal"
  >
    <template #modalContent>
      <p class="mb-3 text-xl font-semibold">{{store.isUpdateSubject ? 'Update' : 'Create'}}</p>
      <BaseInput v-model="store.$state.subject.name"  label="Name" />
      <BaseInput
        class="mt-2"
        v-model="store.$state.subject.oquv_dastur"
        label="O'quv dastur"
      />
      <BaseInput
        class="mt-2"
        v-model="store.$state.subject.oquv_reja"
        label="O'quv reja"
      />
      <BaseInput
        class="mt-2"
        v-model="store.$state.subject.ishchi_oquv_dastur"
        label="Ishchi o'quv dastur"
      />
      <div class="flex items-center gap-4 mt-2">
        <BaseSelect
            @change="changeItem($event)"
            v-model="store.$state.subject.id_department"
            class="w-1/2"
            :data="store.subjectDepartment"
            label="Id department"
          />
          <BaseSelect
            @change="changeItemSecond($event)"
            v-model="store.$state.subject.id_group"
            class="w-1/2"
            :data="store.subjectGroup"
            label="Id group"
          />
      </div>
      <BaseInput
          class="mt-2 w-1/2"
          v-model="store.$state.subject.duration"
          label="Duration "
        />
    </template>
  </BaseModal>
  
    <div class="p-5">
      <div class="flex items-center justify-between">
        <p class="text-3xl">Subject</p>
        <div class="flex items-center gap-2">
          <BaseInput
            v-model.trim="store.$state.searchSubject"
            @input="searchSubjectFunc(store.$state.searchSubject)"
            type="search"
            label=""
          />
          <BaseButton btn-text="search" @click="searchSubjectFunc(store.$state.searchSubject)"/>
        </div>
        <BaseButton btn-text="create" @click="toggleSubjectModal" />
      </div>
      <div class="mt-5">
        <BaseTable
          @deleteItem="deleteSelectedItem"
          @editItem="editSelectedItem"
          v-if="store.subjectHeader.length"
          :table-header="store.subjectHeader"
          :table-body="store.$state.searchSubjects.length ? store.$state.searchSubjects : store.subjectBody"
        />
        <p
          v-if="!store.subjectHeader.length"
          class="text-center text-5xl mt-20"
        >
          This table is empty
        </p>
      </div>
    </div>
  </main>
</template>
