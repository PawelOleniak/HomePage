import { SET_SELECTED_CATEGORY_ID } from 'data/constants';

const initialState = {
  SelectedCategoryId: undefined,
};

function budget(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_CATEGORY_ID:
      return {
        ...state,
        SelectedCategoryId: action.payload,
      };

    default:
      return state;
  }
}
export default budget;
