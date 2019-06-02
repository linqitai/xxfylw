import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/visitorList'
    },
    {
      path: '/login',
      name: '登录',
      component: (resolve) => {
        import('../pages/Login/Login').then((module) => {
          resolve(module)
        })
      }
    },
    {
      path: '/demo',
      name: 'demo',
      component: (resolve) => {
        import('../pages/demo/demo/demo').then((module) => {
          resolve(module)
        })
      }
    },
    {
      path: '/demo2',
      name: 'demo2',
      component: (resolve) => {
        import('../pages/demo/demo/demo2').then((module) => {
          resolve(module)
        })
      }
    },
    // ==========西瓜帮你找===========
    {
      path: '/',
      name: 'Home4Manage',
      component: (resolve) => {
        import('../components/Home4Manage').then((module) => {
          resolve(module)
        })
      },
      children: [
        {
          path: '/visitorList',
          name: '访客库',
          component: (resolve) => {
            import('../pages/visitor/list').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/blackList',
          name: '黑名单库',
          component: (resolve) => {
            import('../pages/black/list').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/lawyerList',
          name: '律师库',
          component: (resolve) => {
            import('../pages/lawyer/list').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/courtList',
          name: '法院库',
          component: (resolve) => {
            import('../pages/court/list').then((module) => {
              resolve(module)
            })
          }
        }
      ]
    }
  ]
});
