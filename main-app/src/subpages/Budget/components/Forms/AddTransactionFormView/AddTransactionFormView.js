import React, { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Modal } from 'components';
import AddTransactionForm from './AddTransactionForm';
import API from 'data/fetch';
import { BudgetContext } from 'subpages/Budget/BudgetContext';

export default function AddTransactionFormView() {
  const history = useHistory();

  const { selectedBudget } = useContext(BudgetContext.Context);
  const id = selectedBudget.value;
  const { data: budget } = useQuery(['budget', id], () => API.budget.fetchBudget(id));
  const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);
  const queryClient = useQueryClient();

  const mutation = useMutation(API.budget.addTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(['budget', id]);
    },
  });
  const handleSubmitAddTransaction = (values) => {
    mutation.mutate({
      budgetId: budget.id,
      data: values,
    });
    history.goBack();
  };
  return (
    <Modal>
      <AddTransactionForm
        categories={allCategories}
        groupedCategoriesBy="parentCategory.name"
        onSubmit={handleSubmitAddTransaction}
      />
    </Modal>
  );
}
