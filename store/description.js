export const state = () => ({
  currentTrack: {
    id: '',
    name: '',
    artist: '',
    img: '',
    genre: [],
    color: '',
    inverseColor: '',
  },
  cursorAnimationRunning: false,
  descriptionVisible: false,
  maskBackground: 'transparent',
  hoverCloseButton: false,
  hoverPlayer: false,
})

export const actions = {
  onTrackClick({ commit }, track) {
    commit('setCurrentTrack', track)
    commit('setCursorAnimationRunning', true)
    commit('setDescriptionVisible', true)
  },
  onCursorAnimationEnd({ commit, state }) {
    commit('setMaskBackground', state.currentTrack.color)
    commit('setCursorAnimationRunning', false)
  },
  onHoverCloseButton({ commit }) {
    commit('setHoverCloseButton', true)
  },
  onHoverOutCloseButton({ commit }) {
    commit('setHoverCloseButton', false)
  },
  closeDescription({ commit }) {
    commit('setHoverPlayer', false)
    commit('setHoverCloseButton', false)
    commit('setMaskBackground', 'transparent')
    commit('setDescriptionVisible', false)
  },
  hoverPlayer({ commit }) {
    commit('setHoverPlayer', true)
  },
  hoverOutPlayer({ commit }) {
    commit('setHoverPlayer', false)
  },
}

export const mutations = {
  setCurrentTrack(state, value) {
    state.currentTrack = value
  },
  setCursorAnimationRunning(state, value) {
    state.cursorAnimationRunning = value
  },
  setDescriptionVisible(state, value) {
    state.descriptionVisible = value
  },
  setHoverCloseButton(state, value) {
    state.hoverCloseButton = value
  },
  setMaskBackground(state, value) {
    state.maskBackground = value
  },
  setHoverPlayer(state, value) {
    state.hoverPlayer = value
  },
}
