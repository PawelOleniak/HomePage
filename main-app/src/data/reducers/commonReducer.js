const initialState = {
  loadingState: null,
};

function common(state = initialState, action) {
  const newLoadingState = { ...state.loadingState };
  switch (action.type) {
    default:
      return state;
  }
}
export default common;
