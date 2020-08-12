export const state = () => ({
  isHoverTrack: false,
  scrolling: false,
  hoverTrack: {
    id: '',
    name: '',
    color: '#000',
    inverseColor: '#000',
  },
})

export const actions = {
  onHover({ commit }, track) {
    commit('setIsHoverTrack', true)
    commit('setHoverTrack', track)
  },
  onHoverOut({ commit }) {
    commit('setIsHoverTrack', false)
    commit('setHoverTrack', {
      id: '',
      name: '',
      color: '#000',
      inverseColor: '#000',
    })
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
  setHoverTrack(state, value) {
    state.hoverTrack = value
  },
}
