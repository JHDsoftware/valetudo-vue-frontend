import Vue from 'vue'
import VueRouter from 'vue-router'
import MakeADress from '../views/MakeADress.vue'
import LoginPage from '../views/LoginAndRegister/LoginPage'
import RegisterComplete from '../views/LoginAndRegister/RegisterComplete'
import ResetPassword from '../views/LoginAndRegister/ResetPassword'
import ForgetPasswordComplete from '../views/LoginAndRegister/ForgetPasswordComplete'
import OrderPage from '../views/My/OrderPage'
import CreateNewDress from '../views/CreateNewOrder/CreateNewDress'
import ForgetPasswordConfirmEmail from "../views/LoginAndRegister/ForgetPasswordConfirmEmail";
import SetPassword from '../views/LoginAndRegister/SetPassword';
import SetPasswordComplete from '../views/LoginAndRegister/SetPasswordComplete';
import QuestionsPage from '../views/Questions/QuestionsPage'
import QuestionsPage2 from "../views/Questions/QuestionsPage2";
import QuestionsPage3 from "../views/Questions/QuestionsPage3";
import FAQ from "../views/LoginAndRegister/FAQ";

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
    path: '/FAQ',
    name: 'FAQ',
    component: FAQ
  },
  {
    path: '/questions',
    name: 'questions',
    component: QuestionsPage
  },
  {
    path: '/questions2',
    name: 'questions2',
    component: QuestionsPage2
  },
  {
    path: '/questions3',
    name: 'questions3',
    component: QuestionsPage3
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
    path: '/setPassword',
    name: 'setPassword',
    component: SetPassword
  },
  {
    path: '/setPasswordComplete',
    name: 'setPasswordComplete',
    component: SetPasswordComplete
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
