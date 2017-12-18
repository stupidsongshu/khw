/**
 * 贷款
 */
const state = {
  /**
   * loan_duration 贷款期数(单位:月 默认6月)
   * loan_limit    贷款额度(单位:分 默认2000元)
   * loan_max      最大额度(单位:分 默认50000元)
   */
  loan_duration: 6,
  loan_limit: 200000,
  loan_max: 5000000
}

const getters = {}

const mutations = {
  loan_duration_save(state, payload) {
    state.loan_duration = payload
  },
  loan_limit_save(state, payload) {
    state.loan_limit = payload
  },
  loan_max_save(state, payload) {
    state.loan_max = payload
  }
}

const actions = {
  loan_max_actions_save(context, payload) {
    context.commit('loan_max_save', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
