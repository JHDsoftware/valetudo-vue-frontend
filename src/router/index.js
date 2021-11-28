import Vue from 'vue'
import VueRouter from 'vue-router'
import MakeADress from '../views/MakeADress.vue'
import LoginPage from '../views/LoginAndRegister/LoginPage'
import RegisterComplete from '../views/LoginAndRegister/RegisterComplete'
import ResetPassword from '../views/LoginAndRegister/ResetPassword'
import ForgetPasswordComplete from '../views/LoginAndRegister/ForgetPasswordComplete'
import QuestionsPage from '../views/Questions/QuestionsPage'
import OrderPage from '../views/My/OrderPage'
import CreateNewDress from '../views/CreateNewOrder/CreateNewDress'
import ForgetPasswordConfirmEmail from "../views/LoginAndRegister/ForgetPasswordConfirmEmail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: LoginPage
  },
  {
    path: '/createNewDress',
    name: 'createNewDress',
    component: CreateNewDress
  },
  {
    path: '/order',
    name: 'order',
    component: OrderPage
  },
  {
    path: '/questions',
    name: 'questions',
    component: QuestionsPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: ResetPassword
  },
  {
    path: '/forgetPasswordConfirmEmail',
    name: 'forgetPasswordConfirmEmail',
    component: ForgetPasswordConfirmEmail
  },
  {
    path: '/forgetPasswordComplete',
    name: 'forgetPasswordComplete',
    component: ForgetPasswordComplete
  },
  {
    path: '/registerComplete',
    name: 'registerComplete',
    component: RegisterComplete
  },
  {
    path: '/edit',
    name: 'edit',
    component: MakeADress
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
