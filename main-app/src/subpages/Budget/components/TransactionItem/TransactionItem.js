import React, { useMemo, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ListItem } from '../BudgetTransactionList/BudgetTransactionListCss';
import { formatCurrency, formatDate } from 'utils';
import { Link } from 'react-router-dom';
import { Button } from 'components';
import { useHistory } from 'react-router-dom';
import { BudgetContext } from 'subpages/Budget/BudgetContext';
import API from 'data/fetch';
export default function TransactionItem({ transactions, allCategories, ...props }) {
  const { selected } = props;
  return selected ? (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <ListItem key={transactions.description} vertical={selected}>
        <div>Description</div>
        <div>Amount</div>
        <div>Date</div>
        <div>Category</div>
      </ListItem>
      <WrappedItem key={transactions.id} transaction={transactions} allCategories={allCategories} vertical={selected} />
    </ul>
  ) : (
    <ul>
      {transactions.map((transaction) => (
        <Link
          key={transaction.id}
          to={'/budget/transactions/' + transaction.id}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <WrappedItem key={transaction.id} transaction={transaction} allCategories={allCategories} />
        </Link>
      ))}
    </ul>
  );
}

function WrappedItem({ transaction, allCategories, vertical }) {
  const history = useHistory();

  const { selectedBudget } = useContext(BudgetContext.Context);
  const id = selectedBudget.value;

  const queryClient = useQueryClient();

  const mutation = useMutation(API.budget.deleteTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(['budget', id]);
    },
  });
  const handleDeleteTransaction = () => {
    mutation.mutate({
      transactionId: transactionId,
    });
    if (vertical) {
      history.goBack();
    }
  };
  const name = useMemo(
    () => (allCategories.find((category) => transaction.categoryId === category.id) || {}).name,
    [allCategories, transaction]
  );
  const transactionId = transaction.id;
  console.log(transactionId);
  return (
    <ListItem vertical={vertical}>
      <div>{transaction.description}</div>
      <div>{formatCurrency(transaction.amount)}</div>
      <div>{formatDate(transaction.date)}</div>
      <div>{name ? name : 'Uncategorized'}</div>
      <div onClick={(event) => event.preventDefault()}>
        {vertical ? 'Delete transaction ' : null}
        <Button variant={'inline'} onClick={handleDeleteTransaction}>
          &times;
        </Button>
      </div>
    </ListItem>
  );
}
