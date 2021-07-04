import { BUDGET_GET,
         BUDGETED_CATEGORIES_GET,
         SET_SELECTED_CATEGORY_ID,
         BUDGET_TRANSACTION_ADD,
         BUDGETED_CATEGORY_ADD,
         PARENT_CATEGORY_ADD,
         BUDGET_ADD} from "data/constants";

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
export const addBudgetedCategory = ({ data }) =>{
    const promise = API.budget.addBudgetedCategory({
        data
    });
    return{
        type: BUDGETED_CATEGORY_ADD,
        promise,
        messege:"Budgeted Category added!"
    }
}

export const addParentCategory = ({ data }) => {
    const promise = API.budget.addParentCategory({
        data
    });
    return {
        type: PARENT_CATEGORY_ADD,
        promise,
        messege: "Parent Category added!"
    }
}

export const addBudget = ({ data }) =>{
    const promise = API.budget.addBudget({
        data
    });
    return{
        type: BUDGET_ADD,
        promise,
        messege:"Budget added!"
    }
}

export const selectCategory = (id) => {
    return{
        type: SET_SELECTED_CATEGORY_ID,
        payload: id
    }
}