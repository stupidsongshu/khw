const state = {
  /**
   * 底部tabbar
   * hasFooter: 显示隐藏
   * tabBarActiveIndex: 激活序号
   */
  hasFooter: true,
  activeTabIndex: 0,
  /**
   * 是否登录
   */
  loginInfo: {
    isLogin: false,
    mobile: ''
  },
  /**
   * fix 输入框被输入法遮住
   * status 输入法是否弹起
   * target 输入法弹起后需隐藏的dom结点数组
   */
  toggleView: {
    status: false,
    target: []
  },
  /**
   * 公共参数包裹对象
   */
  commonParams: {},
  /**
   * 用户状态
   * userStatus: 0 1借款 2还款
   */
  userStatus: 0,
  /**
   * 用户汇总信息
   */
  summaryInfo: {}
}

const getters = {}

const mutations = {
  hasFooterSave(state, payload) {
    state.hasFooter = payload
  },
  tabBarActiveIndexSave(state, payload) {
    state.activeTabIndex = payload
  },
  loginInfoSave(state, payload) {
    state.loginInfo = payload
  },
  toggleViewSave(state, payload) {
    state.toggleView = payload
  },
  commonParamsSave(state, payload) {
    state.commonParams = payload
  },
  userStatusSave(state, payload) {
    state.userStatus = payload
  },
  summaryInfoSave(state, payload) {
    state.summaryInfo = payload
  }
}

const actions = {
  summaryInfoAction(context, payload) {
    context.commit('summaryInfoSave', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
