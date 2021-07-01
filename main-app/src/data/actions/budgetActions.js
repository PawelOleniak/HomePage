import { BUDGET_GET,
         BUDGETED_CATEGORIES_GET,
         SET_SELECTED_CATEGORY_ID,
         BUDGET_TRANSACTION_ADD } from "data/constants";

import API from "data/fetch";

export const fetchBudget = (id)  => {
    const promise = API.budget.fetchBudget(id);

    return({
        type:BUDGET_GET,
        promise
    })
}

export const fetchBudgetedCategories= () => {
    const promise = API.budget.fetchBudgetedCategories();
    return({
        type:BUDGETED_CATEGORIES_GET,
         promise
    })
}

export const addTransaction = ({ budgetId, data }) =>{
    const promise = API.budget.addTransaction({
        budgetId,
        data
    });
    return{
        type: BUDGET_TRANSACTION_ADD,
        promise,
        messege:"Transaction added!"
    }


}

export const selectCategory = (id) => {
    return{
        type: SET_SELECTED_CATEGORY_ID,
        payload: id
    }


}