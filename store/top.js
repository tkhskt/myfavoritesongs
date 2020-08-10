export const state = () => ({
  isHoverTrack: false,
  scrolling: false,
})

export const actions = {
  onHover({ commit }) {
    commit('setIsHoverTrack', true)
  },
  onHoverOut({ commit }) {
    commit('setIsHoverTrack', false)
  },
  onScroll({ commit }) {
    commit('setScrolling', true)
  },
  onScrollStop({ commit }) {
    commit('setScrolling', false)
  },
}

export const mutations = {
  setIsHoverTrack(state, value) {
    state.isHoverTrack = value
  },
  setScrolling(state, value) {
    state.scrolling = value
  },
}
