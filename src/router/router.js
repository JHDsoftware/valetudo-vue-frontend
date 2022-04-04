import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('../views/LoginAndRegister/LoginRegisterPage'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/temporaryGuid',
    name: 'temporaryGuid',
    component: () => import('../views/temporaryGuid')
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
    path: '/Login',
    name: 'Login',
    component: () => import('../views/LoginAndRegister/Login')
  },
  {
    path: '/createNewDress',
    name: 'createNewDress',
    component: () => import('../views/CreateNewOrder/CreateNewDress')
  },
  {
    path: '/SampleOrder/:id',
    name: 'SampleOrder',
    props: true,
    component: () => import('../views/Order/items/SampleOrder.vue')
  },
  {
    path: '/SampleOrderComplete',
    name: 'SampleOrderComplete',
    component:()=> import('../views/Order/items/SampleOrderComplete')
  },
  {
    path: '/OrderIndex',
    // name: 'OrderIndex',
    redirect: '/OrderIndex/Entwurf',
    component: () => import('../views/Order/OrderIndex'),
    children: [
      {
        path: 'Entwurf',
        name: 'Entwurf',
        component: () => import('../views/Order/items/Entwurf')
      },
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
        // component: () => import("../views/LoginAndRegister/FAQPage")
        component: () => import("../fragments/FAQ")
      }

    ]
  },
  {
    path: '/DressDisplay',
    name: 'DressDisplay',
    component: () => import('@/views/DressDisplay')
  },
  {
    path: '/MakeADress',
    name: 'MakeADress',
    component: () => import('@/views/MakeADress')
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: () => import("../fragments/FAQ")
  },
  {
    path: '/questionspage',
    name: 'questionspage',
    component: () => import('../views/Questions/QuestionsPage')
  },

  {
    path: '/ConfirmEmail',
    name: 'ConfirmEmail',
    component: () => import("../views/LoginAndRegister/ConfirmEmail")
  },
  {
    path: '/ConfirmEmailComplete',
    name: 'ConfirmEmailComplete',
    component: () => import('../views/LoginAndRegister/ConfirmEmailComplete')
  },

  {
    path: '/ResetPassword',
    name: 'ResetPassword',
    component: () => import('../views/LoginAndRegister/ResetPassword')
  },
  {
    path: '/ResetPasswordComplete',
    name: 'ResetPasswordComplete',
    component: () => import('../views/LoginAndRegister/ResetPasswordComplete')
  },

  {
    path: '/edit/:dressId',
    name: 'edit',
    component: () => import('../views/MakeADress.vue'),
    props: true
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
