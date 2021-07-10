import React, { useMemo } from 'react';

import {
  ParentCategory as Root,
  CategoryAmount,
} from './BudgetCategoryListCss';
import { formatCurrency } from 'utils';
import { noop } from 'lodash';
export default function ParentCategory({
  name,
  onClick,
  categories,
  transactions,
  amount,
}) {
  const categoryLvalue = useMemo(() => {
    if (!!amount) return null;

    const budgeted = (() => {
      try {
        return categories.reduce((acc, category) => acc + category.amount, 0);
      } catch (error) {
        return null;
      }
    })();

    const parentCategoryTransactions = transactions
      ? transactions.filter((transaction) => {
          return categories.find(
            (category) => category.categoryId === transaction.categoryId
          );
        })
      : null;

    const spentOnParentCategory = parentCategoryTransactions
      ? parentCategoryTransactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        )
      : null;

    const total =
      budgeted && spentOnParentCategory
        ? budgeted - spentOnParentCategory
        : null;

    return total;
  }, [categories, transactions, amount]);

  const amountValue = useMemo(
    () => amount || categoryLvalue,
    [amount, categoryLvalue]
  );

  return (
    <Root onClick={onClick}>
      <span>{name}</span>
      <CategoryAmount negative={amountValue < 0}>
        {formatCurrency(amountValue)}
      </CategoryAmount>
    </Root>
  );
}
