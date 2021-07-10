import React, { useMemo } from 'react';
import { ListItem } from '../BudgetTransactionList/BudgetTransactionListCss';
import { formatCurrency, formatDate } from 'utils';
import { Link } from 'react-router-dom';

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
  const name = useMemo(
    () => (allCategories.find((category) => transaction.categoryId === category.id) || {}).name,
    [allCategories, transaction]
  );
  return (
    <ListItem vertical={vertical}>
      <div>{transaction.description}</div>
      <div>{formatCurrency(transaction.amount)}</div>
      <div>{formatDate(transaction.date)}</div>
      <div>{name ? name : 'Uncategorized'}</div>
    </ListItem>
  );
}
