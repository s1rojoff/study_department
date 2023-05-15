import axios from "axios";
import { onMounted } from "vue";
import { useStore } from "../store/main";
export function useDepartment() {
  const store = useStore();
  const { isOpenDepartmentModal, toggleDepartmentModal, department } = store;
  function getAllDepartments() {
    store.departmentBody = [];
    store.$state.departmentHeader = [];
    axios.get("http://localhost:3000/department").then((res) => {
      Array.from(res.data).forEach((element) => {
        let department = {
          id: element.id,
          name: element.name,
        };
        store.departmentBody.push(department);
      });
      store.$state.departmentHeader = ["Id", "Name", "Action"];
    });
  }
  onMounted(() => {
    getAllDepartments();
  });
  function postDepartment() {
    axios
      .post("http://localhost:3000/department", {
        name: store.$state.department,
      })
      .then((res) => {
        getAllDepartments();
        toggleDepartmentModal();
        store.$state.department = "";
      });
  }
  function deleteDepartment(index) {
    axios.delete(`http://localhost:3000/department/${index}`).then((res) => {
      getAllDepartments();
    });
  }
  function updateDepartment(index) {
    store.$state.departmentBody.forEach((el) => {
      if (el.id == index) {
        store.department = el.name;
        store.$state.departmentBody.splice(index, 1);
      }
    });
    toggleDepartmentModal();
    deleteDepartment(index)
  }


  function searchDepartmentFunc(inputVal){
    store.searchDepartments =[]
    axios.get(`http://localhost:3000/departments/${inputVal}`).then(res => {
      Array.from(res.data).forEach(el => {
        store.searchDepartments.push({id:el.id, name: el.name})
      })
    })
  }
  return {
    getAllDepartments,
    postDepartment,
    deleteDepartment,
    updateDepartment,
    searchDepartmentFunc
  };
}
export function useStudent() {
  const store = useStore();
  const { isOpenStudentModal, toggleStudentModal } = store;

  function getAllStudents() {
    store.$state.studentBody = [];
    axios.get("http://localhost:3000/student").then((res) => {
      Array.from(res.data).forEach((el) => {
        axios
          .get(`http://localhost:3000/group/${el.id_group}`)
          .then((response) => {
            let student = {
              id: el.id,
              full_name: el.ful_name,
              email: el.email,
              group: el.group,
              birthday: `${el.dateofbirth}`.substring(0, 10),
              status: el.status,
              address: el.address,
              course: el.cours_number + "-kurs",
              group: response.data.name,
            };
            store.$state.studentBody.push(student);
          });
      });
      store.$state.studentHeader = [
        "Id",
        "Fullname",
        "Email",
        "Group",
        "Birthday",
        "Status",
        "Address",
        "Course",
        "Action",
      ];
    });
  }
  function deleteStudent(index) {
    axios
      .delete(`http://localhost:3000/student/${index}`)
      .then((res) => getAllStudents());
  }
  function postStudent() {
    axios
      .post("http://localhost:3000/student", store.$state.student)
      .then((res) => {
        getAllStudents();
        toggleStudentModal();
      });
  }

  function searchStudent(inputVal) {
    store.$state.searchStudents = [];
    axios.get(`http://localhost:3000/students/${inputVal}`).then((res) => {
      Array.from(res.data).forEach((el) => {
        axios
          .get(`http://localhost:3000/group/${el.id_group}`)
          .then((response) => {
            store.$state.searchStudents.push({
              id: el.id,
              full_name: el.ful_name,
              email: el.email,
              group: el.group,
              birthday: el.dateofbirth,
              status: el.status,
              address: el.address,
              course: el.cours_number + "-kurs",
              group: response.data.name,
            });
          });
      });
    });
  }

  function updateStudent(index) {
    store.toggleStudentModal();
    store.isPostStudent = true;

    axios.get(`http://localhost:3000/student/${index}`).then((res) => {
      getGroupName();
      store.student.ful_name = res.data.ful_name;
      store.student.email = res.data.email;
      store.student.phone = res.data.phone;
      store.student.password = res.data.phone;
      store.student.dateofbirth = `${res.data.dateofbirth}`.substring(0, 10);
      store.student.cours_number = res.data.cours_number;
      store.student.status = res.data.status;
      store.student.address = res.data.address;
      store.student.id_group = res.data.id_group;
    });
    axios
      .put(`http://localhost:3000/student/${index}`, store.student)
      .then((res) => {
        deleteStudent(index);
      });
  }

  function getGroupName() {
    store.studentGroupName = [];
    axios.get("http://localhost:3000/group").then((res) => {
      Array.from(res.data).forEach((el) => {
        let group = { id: el.id, name: el.name };
        store.$state.studentGroupName.push(group);
      });
    });
  }
  onMounted(() => {
    getAllStudents();
    // searchStudent()
  });
  return {
    deleteStudent,
    getAllStudents,
    postStudent,
    getGroupName,
    updateStudent,
    searchStudent,
  };
}

export function useTeacher() {
  const store = useStore();
  const { isOpenTeacherModal, toggleTeacherModal } = store;
  function getAllTeachers() {
    store.$state.teacherHeader = [];
    store.$state.teacherBody = [];
    axios.get("http://localhost:3000/teacher").then((res) => {
      Array.from(res.data).forEach((el) => {
        axios
          .get(`http://localhost:3000/department/${el.id_department}`)
          .then((response) => {
            let teacher = {
              id: el.id,
              full_name: el.ful_name,
              email: el.email,
              phone: el.phone,
              password: el.password,
              birthday: el.dateofbirth,
              address: el.address,
              department: response.data.name,
              position: el.position,
              status: el.status,
            };
            store.$state.teacherBody.push(teacher);
          });
      });

      store.$state.teacherHeader = [
        "Id",
        "Fullname",
        "Email",
        "Phone",
        "Password",
        "Birthday",
        "Address",
        "Department",
        "Position",
        "Status",
        "Action",
      ];
    });
  }

  function postTeacher() {
    axios
      .post("http://localhost:3000/teacher", store.$state.teacher)
      .then((res) => {
        getAllTeachers();
        toggleTeacherModal();
      });
  }
  function deleteTeacher(index) {
    axios.delete(`http://localhost:3000/teacher/${index}`).then((res) => {
      getAllTeachers();
    });
  }
  function getDepartmentName() {
    store.teacherDepartmentName = [];
    axios.get("http://localhost:3000/department").then((res) => {
      Array.from(res.data).forEach((el) => {
        let department = { id: el.id, name: el.name };
        store.$state.teacherDepartmentName.push(department);
      });
    });
  }
  function updateTeacher(index) {
    store.isUpdateTeacher = true;
    toggleTeacherModal();
    getDepartmentName();
    axios.get(`http://localhost:3000/teacher/${index}`).then((res) => {
      store.$state.teacher.ful_name = res.data.ful_name;
      store.$state.teacher.email = res.data.email;
      store.$state.teacher.phone = res.data.phone;
      store.$state.teacher.password = res.data.password;
      store.$state.teacher.dateofbirth = res.data.dateofbirth.substring(0, 10);
      store.$state.teacher.address = res.data.address;
      store.$state.teacher.position = res.data.position;
      store.$state.teacher.category = res.data.category;
      store.$state.teacher.type_employment = res.data.type_employment;
      store.$state.teacher.status = res.data.status;
      store.$state.teacher.id_department = res.data.id_department;
    });
    deleteTeacher(index);
  }
  function searchTeacher(inputVal) {
    store.$state.searchTeachers = [];
    axios.get(`http://localhost:3000/teachers/${inputVal}`).then((res) => {
      Array.from(res.data).forEach((el) => {
        axios
          .get(`http://localhost:3000/department/${el.id_department}`)
          .then((response) => {
            let teacher = {
              id: el.id,
              full_name: el.ful_name,
              email: el.email,
              phone: el.phone,
              password: el.password,
              birthday: el.dateofbirth,
              address: el.address,
              department: response.data.name,
              position: el.position,
              status: el.status,
            };
            store.$state.searchTeachers.push(teacher);
          });
      });
    });
  }

  return {
    getAllTeachers,
    postTeacher,
    deleteTeacher,
    getDepartmentName,
    updateTeacher,
    searchTeacher,
  };
}

export function useGroup() {
  const store = useStore();
  const { toggleGroupModal } = store;

  function getAllGroups() {
    store.groupBody = [];
    axios.get("http://localhost:3000/group").then((res) => {
      Array.from(res.data).forEach((el) => {
        let group = {
          id: el.id,
          name: el.name,
          group_kurator: el.group_kurator,
          id_department: el.id_department,
        };
        store.groupBody.push(group);
        store.groupHeader = [
          "Id",
          "Name",
          "Group Kurator",
          "Id department",
          "Action",
        ];
      });
    });
  }
  function postGroups() {
    getGroupCuratorName();
    axios.post(`http://localhost:3000/group`, store.group).then((res) => {
        getAllGroups();
      });
      toggleGroupModal();
  }

  function deleteGroup(index) {
    axios.delete(`http://localhost:3000/group/${index}`).then((res) => {
      getAllGroups();
    });
  }

  function updateGroup(index) {
    store.isUpdateGroup = true;
    axios.get(`http://localhost:3000/group/${index}`).then((res) => {
      (store.group.name = res.data.name),
        (store.group.group_kurator = res.data.group_kurator);
      store.group.id_department = res.data.id_department;
    });
    deleteGroup(index);
    toggleGroupModal();
  }

  function getGroupCuratorName() {
    axios.get("http://localhost:3000/teacher").then((res) => {
      Array.from(res.data).forEach((el) => {
        store.groupCuratorName.push({ id: el.id, name: el.ful_name });
      });
    });
  }
  function getGroupDepartmentName() {
    axios.get("http://localhost:3000/department").then((res) => {
      Array.from(res.data).forEach((el) => {
        store.groupDepartmentName.push({ id: el.id, name: el.name });
      });
    });
  }

  function searchTeacherFunc(inputVal) {
    store.$state.searchGroups = [];
    axios.get(`http://localhost:3000/groups/${inputVal}`).then((res) => {
      Array.from(res.data).forEach((el) => {
        store.$state.searchGroups.push({
          id: el.id,
          name: el.name,
          group_kurator: el.group_kurator,
          id_department: el.id_department,
        });
      });
    });
  }

  onMounted(() => {
    getAllGroups();
    getGroupCuratorName();
    getGroupDepartmentName();
  });
  return {
    getAllGroups,
    postGroups,
    deleteGroup,
    updateGroup,
    searchTeacherFunc,
  };
}
