import React, { useContext } from 'react';
import { CategoryItem as Root, CategoryAmount } from './BudgetCategoryListCss';
import { formatCurrency } from 'utils';
import { Context } from 'Context';
export default function CategoryItem({ name, item, transactions }) {
  const categoryTransactions = transactions.filter((transaction) => transaction.categoryId === item.id);
  const { isPhone } = useContext(Context);
  const spentOnCategory = categoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  const total = item.budget - spentOnCategory;
  const totalAmount = item.budget;
  return (
    <Root>
      <span>{name}</span>
      <CategoryAmount negative={total < 0}>
        {typeof totalAmount !== 'undefined' && !isPhone ? total : formatCurrency(total)}
        {totalAmount && !isPhone ? ' / ' + formatCurrency(totalAmount) : null}
      </CategoryAmount>
    </Root>
  );
}
