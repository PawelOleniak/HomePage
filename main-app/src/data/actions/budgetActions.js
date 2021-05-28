import {BUDGET_GET,

        BUDGET_GET_REQUEST,
        BUDGET_GET_FALIURE,
        BUDGET_GET_SUCCESS,

        BUDGETED_CATEGORIES_GET_REQUEST,
        BUDGETED_CATEGORIES_GET_FALIURE,
        BUDGETED_CATEGORIES_GET_SUCCESS
        } from "data/constants";

import API from "data/fetch";

export const fetchBudget = (id) => (dispatch) => {
    const promise = API.budget.fetchBudget(id);
    console.log(id)
    dispatch({
        type:BUDGET_GET,
        promise
    })



    dispatch({
        type:BUDGET_GET_REQUEST
    })
    try {
        const response =  API.budget.fetchBudget(id);
        console.log(response)
        const data =  response.json();
        console.log(data)
        dispatch({
            type:BUDGET_GET_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:BUDGET_GET_FALIURE
        })
    }
}

export const fetchBudgetedCategories= (id) => async(dispatch) => {
    dispatch({
        type:BUDGETED_CATEGORIES_GET_REQUEST
    })
    try {
        const response = await API.budget.fetchBudgetedCategories(id);
        const Categoriesdata = await response.json();
        console.log(Categoriesdata)
        dispatch({
            type:BUDGETED_CATEGORIES_GET_SUCCESS,
            payload: Categoriesdata
        })
    } catch (error) {
        dispatch({
            type:BUDGETED_CATEGORIES_GET_FALIURE
        })
    }

}