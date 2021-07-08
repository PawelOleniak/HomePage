import React, { createContext, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query';

const Context = createContext({});

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const ContextProvider = ({ children }) => {
    const month = new Date().getMonth() - 1
    const [selectedBudget, setSelectedBudget] = useState({ value: month.toString(), Label: monthNames[month] });
    const queryClient = useQueryClient();
    useEffect(() => {
        queryClient.invalidateQueries();
    }, [queryClient, selectedBudget]);

    return (
        <Context.Provider value={{
            selectedBudget,
            setSelectedBudget
        }}>
            {children}
        </Context.Provider>
    )
}
const BudgetContext = {
    Context,
    ContextProvider
}

export default BudgetContext