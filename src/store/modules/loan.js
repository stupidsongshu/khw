/**
 * 贷款
 */
const state = {
  /**
   * loan_duration 贷款时长(单位:默认3月)
   * loan_limit    贷款额度(单位:默认10000元)
   */
  loan_duration: 3,
  loan_limit: 10000,
  /**
   * baseTotCreLine 基础额度总额
   */
  baseTotCreLine: 20000
}

const getters = {}

const mutations = {
  loan_duration_save(state, payload) {
    state.loan_duration = payload
  },
  loan_limit_save(state, payload) {
    state.loan_limit = payload
  },
  baseTotCreLineSave(state, payload) {
    state.baseTotCreLine = payload
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
