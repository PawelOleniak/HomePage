const apiURL = process.env.REACT_APP_API_URL;

export const fetchBudget = async (id) => {
  const baseURL = `${apiURL}/budgets/${id}/?_embed=transactions`;
  const response = await fetch(baseURL);

  return await response.json();
};
export const fetchAllBudgets = async () => {
  const baseURL = `${apiURL}/budgets`;
  const response = await fetch(baseURL);

  return await response.json();
};
export const fetchBudgetedCategories = async () => {
  const baseURL = `${apiURL}/budgetCategories`;

  const response = await fetch(baseURL);

  return await response.json();
};

export const addTransaction = async ({ budgetId, data }) => {
  const baseURL = `${apiURL}/budgets/${budgetId}/transactions`;
  const response = await fetch(baseURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });
  return await response.json();
};

export const addBudgetedCategory = async ({ data }) => {
  const baseURL = `${apiURL}/budgetCategories`;
  const response = await fetch(baseURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });
  return await response.json();
};
export const addParentCategory = async ({ data }) => {
  const baseURL = `${apiURL}/parentCategories`;
  const response = await fetch(baseURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });
  return await response.json();
};

export const addBudget = ({ data }) => {
  const baseURL = `${apiURL}/budgets`;
  const promise = fetch(baseURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });
  return promise;
};
