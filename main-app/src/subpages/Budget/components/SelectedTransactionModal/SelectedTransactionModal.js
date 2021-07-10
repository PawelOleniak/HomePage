import React, { useMemo, useContext } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { TransactionItem } from '../';
import { Modal } from 'components';
import { BudgetContext } from 'subpages/Budget/BudgetContext';
import API from 'data/fetch';

export default function SelectedTransactionModal() {
  const { selectedBudget } = useContext(BudgetContext.Context);
  const id = selectedBudget.value;
  const { data: budget } = useQuery(['budget', id], () => API.budget.fetchBudget(id));
  const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);

  let location = useLocation();
  const selectedTransactionId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  const selectedTransaction = useMemo(() => {
    if (typeof selectedTransactionId === 'undefined') {
      return budget.transactions;
    }
    if (typeof budget.transactions === 'undefined') {
      return budget.transactions;
    }
    return budget.transactions.find((transaction) => transaction.id === selectedTransactionId);
  }, [selectedTransactionId, budget.transactions]);

  return (
    <Modal>
      <TransactionItem transactions={selectedTransaction} allCategories={allCategories} selected={true} />
    </Modal>
  );
}
