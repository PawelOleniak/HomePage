

export const fetchBudget = (id) => {
    const promise= fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`);

    return promise;
};
export const fetchBudgetedCategories = () => {
    const promise= fetch(`${process.env.REACT_APP_API_URL}/budgetCategories`);


    return promise;
};


export const addTransaction = ({ budgetId, data }) => {
    const promise= fetch(`${process.env.REACT_APP_API_URL}/budgets/${budgetId}/transactions`,
    {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    });
    return promise;
}
