import React, { useMemo, useContext } from 'react';
import { Context } from 'Context';
import { ParentCategory as Root, CategoryAmount } from './BudgetCategoryListCss';
import { formatCurrency } from 'utils';
export default function ParentCategory({ name, onClick, categories, transactions, amount, total }) {
  const { isPhone } = useContext(Context);
  const categoryLvalue = useMemo(() => {
    const budgeted = (() => {
      try {
        return categories.reduce((acc, category) => acc + category.budget, 0);
      } catch (error) {
        return null;
      }
    })();

    const parentCategoryTransactions = transactions
      ? transactions.filter((transaction) => {
          return categories.find((category) => category.categoryId === transaction.categoryId);
        })
      : 0;

    const spentOnParentCategory = parentCategoryTransactions
      ? parentCategoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0)
      : 0;

    const total = budgeted && spentOnParentCategory !== null ? budgeted - spentOnParentCategory : null;
    return total;
  }, [categories, transactions]);

  const amountValue = useMemo(() => amount || categoryLvalue, [amount, categoryLvalue]);

  return (
    <Root onClick={onClick}>
      <span>{name}</span>
      <CategoryAmount negative={amountValue < 0}>
        {typeof total !== 'undefined' && !isPhone ? amountValue : formatCurrency(amountValue)}
        {total && !isPhone ? ' / ' + formatCurrency(total) : null}
      </CategoryAmount>
    </Root>
  );
}
