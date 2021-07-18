import React, { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { Modal } from 'components';
import AddTransactionForm from './AddTransactionForm';
import API from 'data/fetch';
import { BudgetContext } from 'subpages/Budget/BudgetContext';

export default function AddTransactionFormView({ editMode }) {
  const history = useHistory();

  const { selectedBudget } = useContext(BudgetContext.Context);
  const id = selectedBudget.value;
  const { data: budget } = useQuery(['budget', id], () => API.budget.fetchBudget(id));
  const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);
  const queryClient = useQueryClient();

  const addMutation = useMutation(API.budget.addTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(['budget', id]);
    },
  });
  const editMutation = useMutation(API.budget.editTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(['budget', id]);
    },
  });
  const handleAddTransaction = (values) => {
    addMutation.mutate({
      budgetId: budget.id,
      data: values,
    });
    history.goBack();
  };

  let location = useLocation();
  const transactionId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  const handleEditTransaction = (values) => {
    editMutation.mutate({
      budgetId: budget.id,
      transactionId: transactionId,
      data: values,
    });
    history.goBack();
  };
  const editedTransaction = editMode
    ? budget.transactions.find((transaction) => transaction.id === transactionId)
    : null;
  return (
    <Modal>
      <AddTransactionForm
        editedTransaction={editedTransaction}
        categories={allCategories}
        groupedCategoriesBy="parentCategory.name"
        onSubmit={editMode ? handleEditTransaction : handleAddTransaction}
      />
    </Modal>
  );
}
