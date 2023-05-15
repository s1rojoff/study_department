import { defineStore } from "pinia";

export const useStore = defineStore("storeId", {
  state: () => {
    return {
      isOpenStudentModal: false,
      isOpenDepartmentModal: false,
      isOpenTeacherModal: false,
      isOpenGroupModal: false,
      isOpenSubjectModal: false,
      isOpenTeachSubModal: false,
      departmentBody: [],
      departmentHeader: [],
      department: "",
      studentHeader: [],
      studentBody: [],
      searchStudents: [],
      searchTeachers: [],
      searchGroups: [],
      searchSubjects: [],
      searchDepartments: [],
      teacherHeader: [],
      teacherBody: [],
      groupHeader: [],
      groupBody: [],
      student: {
        ful_name: "",
        email: "",
        phone: "",
        password: "",
        dateofbirth: "",
        address: "",
        cours_number: "",
        status: "",
        id_group: "",
      },
      isPostStudent: true,
      subjectTeacherBody: [],
      subjectTeacherHeader: [],
      subjectHeader: [],
      subjectBody: [],
      subject: {
        name: "",
        oquv_dastur: "",
        oquv_reja: "",
        ishchi_oquv_dastur: "",
        id_department: "",
        id_group: "",
        duration: "",
      },
      isUpdateSubject: false,
      isUpdateGroup: false,
      isUpdateTeacher: false,
      group: {
        name: "",
        group_kurator: 0,
        id_department: 0,
      },
      teacher: {
        ful_name: "",
        email: "",
        phone: "",
        password: "",
        dateofbirth: "",
        address: "",
        position: "",
        category: "",
        type_employment: "",
        status: "",
        id_department: "",
      },
      studentGroupName: [],
      teacherDepartmentName: [],
      groupCuratorName: [],
      groupDepartmentName: [],
      subjectDepartment: [],
      subjectGroup: [],
      teacherName: [],
      subjectName: [],
      teacherSubject: {
        id_teacher: "",
        id_subject: "",
      },
      searchStudent: "",
      searchTeacher: "",
      searchGroup: '',
      searchSubject: '',
      searchDepartment: ''
    };
  },
  actions: {
    toggleStudentModal() {
      this.$state.isOpenStudentModal = !this.$state.isOpenStudentModal;
      this.$state.student = {
        ful_name: "",
        email: "",
        phone: "",
        password: "",
        dateofbirth: "",
        address: "",
        cours_number: "",
        status: "",
        id_group: "",
      };
    },
    toggleDepartmentModal() {
      this.$state.isOpenDepartmentModal = !this.$state.isOpenDepartmentModal;
    },
    toggleTeacherModal() {
      this.$state.isOpenTeacherModal = !this.$state.isOpenTeacherModal;
      this.$state.teacher = {
        ful_name: "",
        email: "",
        phone: "",
        password: "",
        dateOfBirth: "",
        address: "",
        position: "",
        category: "",
        type_employment: "",
        status: "",
        id_department: "",
      };
    },
    toggleGroupModal() {
      this.$state.isOpenGroupModal = !this.$state.isOpenGroupModal;
      this.$state.group = {
        name: "",
        group_kurator: "",
        id_department: "",
      };
    },
    toggleSubjectModal() {
      this.$state.isOpenSubjectModal = !this.$state.isOpenSubjectModal;
      this.subject = {
        name: "",
        oquv_dastur: "",
        oquv_reja: "",
        ishchi_oquv_dastur: "",
        id_department: "",
        id_group: "",
        duration: "",
      };
    },
    toggleTeacherSubjectModal() {
      this.$state.isOpenTeachSubModal = !this.$state.isOpenTeachSubModal;
    },
  },
});
