import Vue from 'vue'
import VueRouter from 'vue-router'
import MakeADress from '../views/MakeADress.vue'
import LoginRegisterPage from '../views/LoginAndRegister/LoginRegisterPage'
import Login from '../views/LoginAndRegister/Login'

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
import FAQPage from "../views/LoginAndRegister/FAQPage";
import QuestionsPage1 from "../views/Questions/QuestionsPage1";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: LoginRegisterPage
  },
  {
    path: '/registerComplete',
    name: 'registerComplete',
    component: RegisterComplete
  },
  {
    path: '/loginRegister',
    name: 'loginRegister',
    component: LoginRegisterPage
  },
  {
    path: '/login',
    name: 'login',
    component: Login
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
    path: '/bestellung',
    name: 'bestellung',
    component: () => import('@/views/My/items/Bestellung')
  },
  {
    path: '/persondaten',
    name: 'persondaten',
    component: () => import('@/views/My/items/PersonDaten')
  },
  {
    path: '/FAQPage',
    name: 'FAQPage',
    component: FAQPage
  },
  {
    path: '/questionspage',
    name: 'questionspage',
    component: QuestionsPage
  },
  {
    path: '/questionspage1',
    name: 'questionspage1',
    component: QuestionsPage1
  },
  {
    path: '/questionspage2',
    name: 'questionspage2',
    component: QuestionsPage2
  },
  {
    path: '/questionspage3',
    name: 'questionspage3',
    component: QuestionsPage3
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
    path: '/edit/:dressId',
    name: 'edit',
    component: MakeADress,
    props:true,
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
