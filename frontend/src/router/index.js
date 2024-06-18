import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/register/Register.vue'
import menu from  '../views/windows/menu.vue';
import detailSupplier from '../views/windows/suppliers/detailSupplier.vue';
import bill from '../views/windows/home_menu/bill.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu
    },
    {
      path: '/detailsuppliers/:id', // Aquí definimos un parámetro ':id'
      name: 'Detailsuppliers',
      component: detailSupplier
    },
    {
      path: '/bill/:id', // Aquí definimos un parámetro ':id'
      name: 'billdetail',
      component: bill
    },
    
    
  ]
})

export default router
