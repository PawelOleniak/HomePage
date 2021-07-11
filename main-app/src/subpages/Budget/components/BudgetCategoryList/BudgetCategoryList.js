/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useMemo, useCallback, useContext } from 'react';
import { connect } from 'react-redux';
import { groupBy, noop } from 'lodash';
import { ToggleableList } from 'components/ToggleableList';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';
import { useTranslation } from 'react-i18next';
import { selectCategory } from 'data/actions/budgetActions';
import 'styled-components/macro';
import { useQuery } from 'react-query';
import API from 'data/fetch';
import { SuspenseErrorBoundary } from 'components';
import { BudgetContext } from 'subpages/Budget/BudgetContext';

function BudgetCategoryList({ selectCategory }) {
  const handleClickParentCategoryRef = useRef(null);
  const { t } = useTranslation();
  const { selectedBudget } = useContext(BudgetContext.Context);
  const id = selectedBudget.value;

  const { isFetching: budgetisFetching, data: budget } = useQuery(['budget', id], () => API.budget.fetchBudget(id));

  const { isFetching: budgetedCategoriesisFetching, data: budgetedCategories } = useQuery(
    'budgetedCategories',
    API.budget.fetchBudgetedCategories
  );
  const { isFetching: allCategoriesisFetching, data: allCategories } = useQuery(
    'allCategories',
    API.common.fetchAllCategories
  );

  const isFetching = budgetisFetching || budgetedCategoriesisFetching || allCategoriesisFetching;

  const handleClearCategorySelect = useCallback(() => {
    selectCategory();
    handleClickParentCategoryRef.current();
  }, [selectCategory, handleClickParentCategoryRef]);

  const handleSelectOtherCategory = useCallback(() => {
    selectCategory(null);
    handleClickParentCategoryRef.current();
  }, [selectCategory, handleClickParentCategoryRef]);

  const categoriesFilteredByBudget = budgetedCategories.filter((category) => category.budgetId === id);

  const BudgetedCategoriesByParent = useMemo(
    !isFetching && categoriesFilteredByBudget
      ? () =>
          groupBy(
            categoriesFilteredByBudget,
            (item) => allCategories.find((category) => category.id === item.categoryId).parentCategory.name
          )
      : noop,
    [categoriesFilteredByBudget, allCategories, isFetching]
  );

  const listItems = useMemo(
    !isFetching && BudgetedCategoriesByParent
      ? () =>
          Object.entries(BudgetedCategoriesByParent).map(([parentName, categories]) => ({
            id: parentName,
            Trigger: ({ onClick }) => (
              <ParentCategory
                name={parentName}
                onClick={() => {
                  onClick(parentName);
                  selectCategory(parentName);
                }}
                categories={categories}
                transactions={budget.transactions}
              />
            ),
            children: categories.map((budgetedCategory) => {
              const { name } = allCategories.find((category) => category.id === budgetedCategory.categoryId);

              return (
                <CategoryItem
                  key={budgetedCategory.id}
                  name={name}
                  item={budgetedCategory}
                  transactions={budget.transactions}
                />
              );
            }),
          }))
      : noop,
    [allCategories, BudgetedCategoriesByParent, budget.transactions, selectCategory, isFetching]
  );

  const totalSpent = useMemo(
    () => budget.transactions.reduce((acc, transaction) => acc + transaction.amount, 0),
    [budget.transactions]
  );
  const restToSpent = useMemo(() => budget.totalAmount - totalSpent, [totalSpent, budget.totalAmount]);
  const amountTaken = useMemo(
    () =>
      categoriesFilteredByBudget.reduce((acc, budgetedCategory) => {
        const categoryTransactions = budget.transactions.filter(
          (transaction) => transaction.CategoryId === budgetedCategory.id
        );
        const categoryExpenses = categoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

        return acc + Math.max(categoryExpenses, budgetedCategory.budget);
      }, 0),
    [budget.transactions, categoriesFilteredByBudget]
  );

  const notBudgetedTransactions = useMemo(
    () =>
      budget.transactions.filter((transaction) => {
        return !budgetedCategories.find((budgetedCategory) => budgetedCategory.id === transaction.categoryId);
      }),
    [budget.transactions, budgetedCategories]
  );
  const notBudgetedExpenses = useMemo(
    () => notBudgetedTransactions.reduce((acc, transaction) => acc + transaction.amount, 0),
    [notBudgetedTransactions]
  );
  const availableForRestCategories = useMemo(
    () => budget.totalAmount - amountTaken - notBudgetedExpenses,
    [amountTaken, notBudgetedExpenses, budget.totalAmount]
  );

  return listItems && !isFetching ? (
    <SuspenseErrorBoundary>
      <div
        css={`
          border-bottom: 5px solid ${({ theme }) => theme.colors.gray.normal};
        `}
      >
        <ParentCategory name={budget.name} amount={restToSpent} onClick={handleClearCategorySelect} />
      </div>

      <ToggleableList items={listItems} clickRef={handleClickParentCategoryRef} />
      <div
        css={`
          border-top: 5px solid ${({ theme }) => theme.colors.gray.normal};
        `}
      >
        <ParentCategory name={t('Other')} amount={availableForRestCategories} onClick={handleSelectOtherCategory} />
      </div>
    </SuspenseErrorBoundary>
  ) : (
    <div></div>
  );
}

export default connect(null, {
  selectCategory,
})(BudgetCategoryList);
