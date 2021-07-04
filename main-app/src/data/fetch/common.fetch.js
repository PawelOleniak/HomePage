
export const fetchAllCategories = ()=>{
    const promise= fetch(`${process.env.REACT_APP_API_URL}/categories/?_expand=parentCategory`);

    return promise;
};

export const addCategory = ({ data }) => {
    const promise= fetch(`${process.env.REACT_APP_API_URL}/categories/?_expand=parentCategory`,
    {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    });
    console.log(promise)
    return promise;
}
