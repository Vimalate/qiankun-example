import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import store from './store'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

// 微前端 - 子应用配置
let router = null
let instance = null

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
// eslint-disable-next-line
console.log('window.__POWERED_BY_QIANKUN__', window.__POWERED_BY_QIANKUN__)

// 下面的 /jxy  与主应用  registerMicroApps 中的  activeRule 字段对应
function render (props = {}) {
  const { container } = props
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/' : '/', // 抛出路由加前缀
    mode: 'history',
    routes
  })
  // router.beforeEach((to, from, next) => {
  //   Vue.prototype.$beforeRouter(to, from, next, process.env, Vue)
  // })

  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
export default instance

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props) {
  // props 包含主应用传递的参数  也包括为子应用 创建的节点信息
  if (props.systemCode) {
    store.state.systemCode = props.systemCode
  }
  render(props)
}

export async function unmount () {
  instance.$destroy()
  instance = null
  router = null
}
