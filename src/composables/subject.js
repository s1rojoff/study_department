import axios from "axios";
import { useStore } from "../store/main";
import { onMounted } from "vue";
export function useSubject() {
  const store = useStore();
  function getAllSubject() {
    store.$state.subjectBody = [];
    axios.get("http://localhost:3000/subject").then((res) => {
      Array.from(res.data).forEach((el) => {
        let subject = {
          id: el.id,
          name: el.name,
          oquv_dastur: el.oquv_dastur,
          ishchi_oquv_dastur: el.ishchi_oquv_dastur,
          id_department: el.id_department,
          id_group: el.id_group,
          duration: el.duration,
        };
        store.$state.subjectBody.push(subject);
        store.$state.subjectHeader = [
          "Id",
          "Name",
          "O'quv dastur",
          "Ishchi o'quv dastur",
          "Department",
          "Id group",
          "Duration",
          "Action",
        ];
      });
    });
  }
  function deleteSubject(index) {
    axios
      .delete(`http://localhost:3000/subject/${index}`)
      .then((res) => getAllSubject())
  }
  function postSubject(){
    axios.post('http://localhost:3000/subject',store.$state.subject).then(res =>{
      getAllSubject(),
      store.toggleSubjectModal()
      store.subject.name = ''
      store.subject.oquv_dastur = ''
      store.subject.oquv_reja = ''
      store.subject.ishchi_oquv_dastur = ''
      store.subject.id_department = ''
      store.subject.id_group = ''
      store.subject.duration = ''
    })
  }

function searchSubjectFunc(inputVal){
  store.$state.searchSubjects = []
    axios.get(`http://localhost:3000/subjects/${inputVal}`).then(res => {
      Array.from(res.data).forEach((el) => {
        let subject = {
          id: el.id,
          name: el.name,
          oquv_dastur: el.oquv_dastur,
          ishchi_oquv_dastur: el.ishchi_oquv_dastur,
          id_department: el.id_department,
          id_group: el.id_group,
          duration: el.duration,
        };
        store.$state.searchSubjects.push(subject);
      });
    })
}

  function updateSubject(index){
    store.isUpdateSubject = true
    axios.get(`http://localhost:3000/subject/${index}`).then(res=>{
      store.$state.subject.name = res.data.name,
      store.$state.subject.oquv_dastur = res.data.oquv_dastur,
      store.$state.subject.oquv_reja = res.data.oquv_reja,
      store.$state.subject.ishchi_oquv_dastur = res.data.ishchi_oquv_dastur,
      store.$state.subject.id_department = res.data.id_department,
      store.$state.subject.id_group = res.data.id_group,
      store.$state.subject.duration = res.data.duration
    })
    axios.put(`http://localhost:3000/subject/${index}`, store.$state.subject).then(res => {
      // getAllSubject()
      deleteSubject(index)
    })
    store.toggleSubjectModal()
  }
  function departmentName(){
    axios.get('http://localhost:3000/department').then(res => {
      Array.from(res.data).forEach(el => {
        store.$state.subjectDepartment.push({id:el.id, name: el.name})
      })
    })
  }
  function groupName(){
    axios.get('http://localhost:3000/group').then(res => {
      Array.from(res.data).forEach(el => {
        store.$state.subjectGroup.push({id:el.id, name: el.name})
      })
    })
  }
  onMounted(() => {
    getAllSubject();
    departmentName();
    groupName()
  });
  return {
    deleteSubject,
    postSubject,
    updateSubject,
    searchSubjectFunc
  };
}
