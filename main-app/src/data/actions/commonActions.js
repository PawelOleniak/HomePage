import {
    ALL_CATEGORIES_GET,
    CATEGORY_ADD,
} from "data/constants";

import API from "data/fetch";

export const fetchAllCategories = (id) => {
    const promise = API.common.fetchAllCategories();
    return ({
        type: ALL_CATEGORIES_GET,
        promise
    })
}

export const addCategory = ({ data }) => {
    const promise = API.common.addCategory({
        data
    });
    return {
        type: CATEGORY_ADD,
        promise,
        messege: "Category added!"
    }
    
}
