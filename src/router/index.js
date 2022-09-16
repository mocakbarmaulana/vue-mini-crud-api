import { createRouter, createWebHistory } from 'vue-router'
import PeopleList from '@/views/PeopleList'
import PeopleCreate from '@/views/PeopleCreate'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PeopleList
  },
  {
    path: '/peoples/create',
    name: 'people-create',
    component: PeopleCreate
  },
  {
    path: '/peoples/:id/edit',
    name: 'people-edit',
    component: PeopleCreate
  },
  {
    path: '/peoples/:id',
    name: 'people-show',
    component: PeopleCreate
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
