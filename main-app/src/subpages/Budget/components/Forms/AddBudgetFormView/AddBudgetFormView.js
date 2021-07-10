import React, { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Modal } from 'components';
import API from 'data/fetch';
import AddBudgetForm from './AddBudgetForm';

export default function AddBudgetFormView() {
  const queryClient = useQueryClient();
  const history = useHistory();

  const { data: budgets } = useQuery('budgets', () => API.budget.fetchAllBudgets());
  const budgetsMutation = useMutation(API.budget.addBudget, {
    onSuccess: () => {
      queryClient.invalidateQueries('budgets');
    },
  });
  const handleSubmitAddBudget = (values) => {
    const data = {
      id: (lastBudgetId + 1).toString(),
      name: values.name,
      totalAmount: values.totalAmount,
    };
    budgetsMutation.mutate({
      data: data,
    });
    history.goBack();
  };
  const lastBudgetId = useMemo(() => {
    return parseInt(budgets[budgets.length - 1].id);
  }, [budgets]);

  return (
    <Modal>
      <AddBudgetForm onSubmit={handleSubmitAddBudget} />
    </Modal>
  );
}
