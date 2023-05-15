export const routes = [
  {
    path: "/",
    name: "Student",
    component: () => import("../views/Student.vue"),
  },
  {
    path: "/group",
    name: "Group",
    component: () => import("../views/Group.vue"),
  },
  {
    path: "/teacher",
    name: "Teacher",
    component: () => import("../views/Teacher.vue"),
  },
  {
    path: "/subject",
    name: "Subject",
    component: () => import("../views/Subject.vue"),
  },
  {
    path: "/department",
    name: "Department",
    component: () => import("../views/Department.vue"),
  },
  {
    path: "/teacher_subject",
    name: "TeacherSubject",
    component: () => import("../views/TeacherSubject.vue"),
  },
  {
    path: "/settings",
    name: "Setting",
    component: () => import("../views/Setting.vue"),
  },
];
