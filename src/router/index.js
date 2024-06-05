import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import HomeView from '@/views/HomeView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NotificationView from '@/views/NotificationView.vue'
import TransactionDetailView from '@/views/TransactionDetailView.vue'
import ReportCreateView from '@/views/ReportCreateView.vue'
import TopupView from '@/views/TopupView.vue'
import TopupDetailView from '@/views/TopupDetailView.vue'
import TransferView from '@/views/TransferView.vue'
import TransferDetailView from '@/views/TransferDetailView.vue'
import TransferAmountView from '@/views/TransferAmountView.vue'
import TransferSuccessView from '@/views/TransferSuccessView.vue'
import SuspendedAccountView from '@/views/SuspendedAccountView.vue'
import ProfileView from '@/views/ProfileView.vue'
import BusinessScoreView from '@/views/BusinessScoreView.vue'

// Layout
import Header from '@/components/Layouts/Header.vue'
import Footer from '@/components/Layouts/Footer.vue'

const routes = [
  {
    path: '/business-score',
    name: 'business-score',
    component: BusinessScoreView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/suspended-account',
    name: 'suspended-account',
    component: SuspendedAccountView
  },
  {
    path: '/transfer-success/:transaction_id',
    name: 'transfer-success',
    component: TransferSuccessView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/transfer/:bank_id/:user_bank_id/amount',
    name: 'transfer-amount',
    component: TransferAmountView,  
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/transfer/:bank_id',
    name: 'transfer-detail',
    component: TransferDetailView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: TransferView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/topup/:payment_method',
    name: 'topup-detail',
    component: TopupDetailView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/topup',
    name: 'topup',
    component: TopupView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/report/:user_bank_id/create',
    name: 'report-create',
    component: ReportCreateView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/transaction/:transaction_id',
    name: 'transaction-detail',
    components: { default: TransactionDetailView, Footer },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/notification',
    name: 'notification',
    components: { default: NotificationView, Footer },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: WelcomeView
  },
  {
    path: '/register',
    name: 'register',
    components: { default: RegisterView, Header }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/profile',
    name: 'profile',
    components: { default: ProfileView, Footer },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'home',
    components: { default: HomeView, Footer },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  }
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        name: 'welcome',
      })
    } else {
      next()
    }
  } else {
    // if ((to.name === 'sign-in' || to.name === 'sign-up' || to.name === 'welcome') && is_logged_in) {
    //   next({
    //     name: 'home',
    //   })
    // } else {
    //   next()
    // }
    next()
  }
})


export default router
