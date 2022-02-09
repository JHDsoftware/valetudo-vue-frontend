import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('../views/LoginAndRegister/LoginRegisterPage')
  },
  {
    path: '/registerComplete',
    name: 'registerComplete',
    component: () => import('../views/LoginAndRegister/RegisterComplete')
  },
  {
    path: '/loginRegister',
    name: 'loginRegister',
    component: () => import('../views/LoginAndRegister/LoginRegisterPage')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginAndRegister/Login')
  },
  {
    path: '/createNewDress',
    name: 'createNewDress',
    component: () => import('../views/CreateNewOrder/CreateNewDress')
  },
  {
    path: '/SampleOrder',
    name: 'SampleOrder',
    component: () => import('../views/Order/items/SampleOrder.vue')
  },
  {
    path: '/OrderIndex',
    // name: 'OrderIndex',
    component: () => import('../views/Order/OrderIndex'),
    children: [

      {
        path: 'OrderBestellung',
        name: 'OrderBestellung',
        component: () => import('../views/Order/items/OrderBestellung')
      },
      {
        path: 'OrderPersonData',
        name: 'OrderPersonData',
        component: () => import('../views/Order/items/OrderPersonData')
      },
      {
        path: 'KontaktUns',
        name: 'KontaktUns',
        component: () => import('../views/Order/items/KontaktUns')
      },
      {
        path: 'FAQ',
        name: 'FAQ',
        component: () => import("../views/LoginAndRegister/FAQPage")
      },

    ]
  },
  // {
  //   path: '/bestellung',
  //   name: 'bestellung',
  //   component: () => import('@/views/Order/items/Bestellung')
  // },
  // {
  //   path: '/persondaten',
  //   name: 'persondaten',
  //   component: () => import('@/views/Order/items/PersonDaten')
  // },
  {
    path: '/FAQPage',
    name: 'FAQPage',
    component: () => import("../views/LoginAndRegister/FAQPage")
  },
  {
    path: '/questionspage',
    name: 'questionspage',
    component: () => import('../views/Questions/QuestionsPage')
  },
  // {
  //   path: '/questionspage1',
  //   name: 'questionspage1',
  //   component: QuestionsPage1
  // },
  // {
  //   path: '/questionspage2',
  //   name: 'questionspage2',
  //   component: QuestionsPage2
  // },
  // {
  //   path: '/questionspage3',
  //   name: 'questionspage3',
  //   component: QuestionsPage3
  // },

  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: () => import('../views/LoginAndRegister/ResetPassword')
  },
  {
    path: '/forgetPasswordConfirmEmail',
    name: 'forgetPasswordConfirmEmail',
    component: () => import("../views/LoginAndRegister/ForgetPasswordConfirmEmail")
  },
  {
    path: '/forgetPasswordComplete',
    name: 'forgetPasswordComplete',
    component: () => import('../views/LoginAndRegister/ForgetPasswordComplete')
  },
  {
    path: '/setPassword',
    name: 'setPassword',
    component: () => import('../views/LoginAndRegister/SetPassword')
  },
  {
    path: '/setPasswordComplete',
    name: 'setPasswordComplete',
    component: () => import('../views/LoginAndRegister/SetPasswordComplete')
  },

  {
    path: '/edit/:dressId',
    name: 'edit',
    component: () => import('../views/MakeADress.vue'),
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
