const state = {
  /**
   * 底部tabbar
   * hasFooter: 显示隐藏
   * tabBarActiveIndex: 激活序号
   */
  hasFooter: true,
  activeTabIndex: 0,
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
   * 是否登录 (尚未使用)
   */
  loginInfo: {
    isLogin: false,
    mobile: ''
  },
  /**
   * 用户状态 (尚未使用)
   * userStatus: 0借款 1还款
   */
  userStatus: 0,
  /**
   * 公共参数包裹对象
   */
  commonParams: {},
  /**
   * 用户汇总信息
   */
  summaryInfo: {},
  /**
   * 用款
   */
  cashExtract: {},
  /**
   * 还款
   */
  cashRepay: {}
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
  },
  cashExtractSave(state, payload) {
    state.cashExtract = payload
  },
  cashRepaySave(state, payload) {
    state.cashRepay = payload
  }
}

const actions = {
  // summaryInfoAction(context, payload) {
  //   context.commit('summaryInfoSave', payload)
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
