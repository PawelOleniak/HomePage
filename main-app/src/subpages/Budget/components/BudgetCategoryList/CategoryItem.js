import React from 'react';
import { CategoryItem as Root, CategoryAmount } from './BudgetCategoryListCss';
import { formatCurrency } from 'utils';

export default function CategoryItem({ name, item, transactions }) {
  const categoryTransactions = transactions.filter(
    (transaction) => transaction.categoryId === item.id
  );

  const spentOnCategory = categoryTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const total = item.amount - spentOnCategory;

  return (
    <Root>
      <span>{name}</span>
      <CategoryAmount negative={total < 0}>
        {formatCurrency(total)}
      </CategoryAmount>
    </Root>
  );
}
