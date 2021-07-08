import {
    SET_SELECTED_CATEGORY_ID,
} from "data/constants";

export const selectCategory = (id) => {
    return {
        type: SET_SELECTED_CATEGORY_ID,
        payload: id
    }
}