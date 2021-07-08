export const fetchAllCategories = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/categories/?_expand=parentCategory`
  );

  return await response.json();
};

export const addCategory = async ({ data }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/categories/?_expand=parentCategory`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    }
  );

  return await response.json();
};
