import React, { useMemo, useContext } from 'react';
import { List } from './BudgetTransactionListCss';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { TransactionItem } from '../TransactionItem';
import { useQuery } from 'react-query';
import API from 'data/fetch';
import { BudgetContext } from 'subpages/Budget/BudgetContext';

function BudgetTransactionList({ selectedCategory }) {
  const { selectedBudget } = useContext(BudgetContext.Context);
  const id = selectedBudget.value;
  const { data: budget } = useQuery(['budget', id], () =>
    API.budget.fetchBudget(id)
  );
  const { data: budgetedCategories } = useQuery(
    'budgetedCategories',
    API.budget.fetchBudgetedCategories
  );
  const { data: allCategories } = useQuery(
    'allCategories',
    API.common.fetchAllCategories
  );

  const filteredBySelectedCategory = useMemo(() => {
    if (typeof selectedCategory === 'undefined') {
      return budget.transactions;
    }
    if (selectedCategory === null) {
      return budget.transactions.filter((transaction) => {
        const hasBudgetedCategory = budgetedCategories.some(
          (budgetedCategory) =>
            budgetedCategory.categoryId === transaction.categoryId
        );
        return !hasBudgetedCategory;
      });
    }

    return budget.transactions.filter((transaction) => {
      try {
        const Category = allCategories.find(
          (category) => transaction.categoryId === category.id
        );

        const parentCategoryName = Category.parentCategory.name;

        return parentCategoryName === selectedCategory;
      } catch (error) {
        return false;
      }
    });
  }, [
    selectedCategory,
    budgetedCategories,
    allCategories,
    budget.transactions,
  ]);

  const groupedTransactions = useMemo(
    () =>
      groupBy(filteredBySelectedCategory, (transaction) =>
        new Date(transaction.date).getUTCDate()
      ),
    [filteredBySelectedCategory]
  );

  return (
    <List>
      {Object.entries(groupedTransactions).map(([key, transactions]) => (
        <li key={key}>
          <TransactionItem
            transactions={transactions}
            allCategories={allCategories}
          />
        </li>
      ))}
    </List>
  );
}

export default connect((state) => ({
  selectedCategory: state.budgets.SelectedCategoryId,
}))(BudgetTransactionList);
