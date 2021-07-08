import React, { useContext } from 'react';
import Select from 'react-select';
import { useQuery } from 'react-query';
import API from 'data/fetch';
import { BudgetContext } from 'subpages/Budget/BudgetContext';
const BudgetSelector = () => {
  const { setSelectedBudget } = useContext(BudgetContext.Context);

  const { data: budgets } = useQuery('budgets', () =>
    API.budget.fetchAllBudgets()
  );
  const options = budgets.map((budget) => ({
    value: budget.id,
    label: budget.name,
  }));

  return <Select options={options} onChange={setSelectedBudget} />;
};
export default BudgetSelector;
