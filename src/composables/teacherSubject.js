import axios from "axios"
import { useStore } from "../store/main"
import { onMounted } from "vue";
export function useTeacherSubject() {
    const store = useStore()
    function getAllTeacherSubjects() {
        store.subjectTeacherBody = []
        axios.get('http://localhost:3000/teacher_subject').then(res => {
            Array.from(res.data).forEach(el => {
                store.subjectTeacherBody.push({id: el.id, name: el.ful_name, subject: el.subject_name})
            })
            store.$state.subjectTeacherHeader=['Id','Fullname','Subject name', 'Action']
        })
    }
    function getAllTeacher() {
        axios.get('http://localhost:3000/teacher').then(res => {
            Array.from(res.data).forEach(el => {
                store.$state.teacherName.push({ id: el.id, name: el.ful_name })
            })
        })
    }
    function deleteTeacherSubject(index){
        axios.delete(`http://localhost:3000/teacher_subject/${index}`).then(res=>{
            getAllTeacherSubjects()
        })
    }
    function getAllSubject(){
        axios.get('http://localhost:3000/subject').then(res=>{
            Array.from(res.data).forEach(el => {
                store.$state.subjectName.push({id: el.id, name: el.name})
            })
        })
    }
    function postTeacherSubject(){
        axios.post('http://localhost:3000/teacher_subject', store.$state.teacherSubject).then(res => {
            getAllTeacherSubjects()
            store.toggleTeacherSubjectModal()
        })
    }
    onMounted(() => {
        getAllTeacherSubjects()
        getAllTeacher()
        getAllSubject()
    })
    return {
        postTeacherSubject,
        deleteTeacherSubject
    }
}