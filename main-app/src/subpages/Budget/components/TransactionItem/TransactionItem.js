import React, { useMemo, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ListItem } from '../BudgetTransactionList/BudgetTransactionListCss';
import { formatCurrency, formatDate } from 'utils';
import { Link } from 'react-router-dom';
import { Button } from 'components';
import { useHistory } from 'react-router-dom';
import { BudgetContext } from 'subpages/Budget/BudgetContext';
import { Context } from 'Context';
import API from 'data/fetch';

export default function TransactionItem({ transactions, allCategories, ...props }) {
  const { selected } = props;
  const { isPhone } = useContext(Context);
  return selected ? (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        justifyContent: 'flex-end',
      }}
    >
      <ListItem key={transactions.description} vertical={selected} isPhone={isPhone}>
        <div>{'Description'}</div>
        <div>Amount</div>
        <div>Date</div>
        <div>Category</div>
        <div> Delete</div>
        <div>Edit</div>
      </ListItem>
      <WrappedItem
        key={transactions.id}
        transaction={transactions}
        allCategories={allCategories}
        vertical={selected}
        isPhone={isPhone}
      />
    </ul>
  ) : (
    <ul>
      {transactions.map((transaction) => (
        <Link
          key={transaction.id}
          to={'/HomePage/budget/transactions/' + transaction.id}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <WrappedItem key={transaction.id} transaction={transaction} allCategories={allCategories} isPhone={isPhone} />
        </Link>
      ))}
    </ul>
  );
}

function WrappedItem({ transaction, allCategories, vertical, isPhone }) {
  const history = useHistory();

  const { selectedBudget } = useContext(BudgetContext.Context);
  const id = selectedBudget.value;

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(API.budget.deleteTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(['budget', id]);
    },
  });
  const handleDeleteTransaction = () => {
    deleteMutation.mutate({
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
  return (
    <ListItem vertical={vertical} isPhone={isPhone}>
      <div className="description">{transaction.description}</div>
      <div className="amount">{formatCurrency(transaction.amount)}</div>
      {!isPhone || vertical ? <div className="date">{formatDate(transaction.date)}</div> : null}
      <div className="category">{name ? name : 'Uncategorized'}</div>
      <div className="delete" onClick={(event) => event.preventDefault()}>
        <Button variant={'inline'} onClick={handleDeleteTransaction}>
          x
        </Button>
      </div>
      {vertical ? (
        <Button className="edit" variant={'inline'} to={`/budget/transaction/${transaction.id}`}>
          edit
        </Button>
      ) : null}
    </ListItem>
  );
}
