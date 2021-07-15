const apiURL = process.env.REACT_APP_API_URL || 'https://homebudget1data.herokuapp.com';

export const fetchAllCategories = async () => {
  const response = await fetch(`${apiURL}/categories/?_expand=parentCategory`);

  return await response.json();
};

export const addCategory = async ({ data }) => {
  const response = await fetch(`${apiURL}/categories/?_expand=parentCategory`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });

  return await response.json();
};
