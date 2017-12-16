/**
 * 贷款
 */
const state = {
  /**
   * loan_duration 贷款期数(单位:月 默认3月)
   * loan_limit    贷款额度(单位:分 默认10000元)
   * loan_max      最大额度(单位:分 默认20000元)
   */
  loan_duration: 3,
  loan_limit: 1000000,
  loan_max: 2000000
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

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
