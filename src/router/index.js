import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DriversView from '@/views/DriversView.vue'
import DriversEdit from '@/views/DriversEdit.vue'
import BussesView from '@/views/BussesView.vue'
import BussesEdit from '@/views/BussesEdit.vue'
import AssignmentsView from '@/views/AssignmentsView.vue'
import ContactsView from '@/views/ContactsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/drivers',
    name: 'drivers',
    component: DriversView,
    // children: [
    //   {
    //     path: 'config/:id?',
    //     name: 'drivers-config',
    //     component: DriversEdit,
    //   },
    // ],
  },
  {
    path: '/drivers/config/:id?',
    name: 'drivers-config',
    component: DriversEdit,
  },
  {
    path: '/busses',
    name: 'busses',
    component: BussesView,
  },
  {
    path: '/busses/config/:id?',
    name: 'busses-config',
    component: BussesEdit,
  },
  {
    path: '/assignments',
    name: 'assignments',
    component: AssignmentsView,
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
