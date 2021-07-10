import React, { useMemo, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Modal } from 'components';
import AddCategoryForm from './AddCategoryForm';
import API from 'data/fetch';
import { BudgetContext } from 'subpages/Budget/BudgetContext';

export default function AddCategoryFormView() {
  const history = useHistory();

  const { selectedBudget } = useContext(BudgetContext.Context);
  const id = selectedBudget.value;

  const { data: budgets } = useQuery('budgets', () =>
    API.budget.fetchAllBudgets()
  );
  const { data: allCategories } = useQuery(
    'allCategories',
    API.common.fetchAllCategories
  );
  const queryClient = useQueryClient();

  const categoryMutation = useMutation(API.common.addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const budgetedCategoryMutation = useMutation(API.budget.addBudgetedCategory);
  const parentCategoryMutation = useMutation(API.budget.addParentCategory);

  const handleSubmitAddCategory = (values) => {
    if (values.newParentCategory) {
      parentCategoryMutation.mutate({
        data: {
          id: (lastParentcategoryId + 1).toString(),
          name: values.newParentCategoryName,
        },
      });
    }
    if (values.budgeted) {
      budgetedCategoryMutation.mutate({
        data: {
          id: (lastcategoryId + 1).toString(),
          budget: values.budget,
          categoryId: (lastcategoryId + 1).toString(),
          budgetId: values.budgetId.toString(),
        },
      });
    }
    categoryMutation.mutate({
      data: {
        id: (lastcategoryId + 1).toString(),
        name: values.name,
        parentCategoryId: (values.newParentCategory
          ? (parseInt(lastParentcategoryId) + 1).toString()
          : values.parentCategoryId
        ).toString(),
      },
    });
    history.goBack();
  };

  const lastcategoryId = useMemo(() => {
    return parseInt(allCategories[allCategories.length - 1].id);
  }, [allCategories]);

  const lastParentcategoryId = useMemo(() => {
    return Math.max.apply(
      Math,
      allCategories.map((category) => {
        return category.parentCategoryId;
      })
    );
  }, [allCategories]);
  console.log(budgets);
  return (
    <Modal>
      <AddCategoryForm
        categories={allCategories}
        budgets={budgets}
        onSubmit={handleSubmitAddCategory}
        selectedBudgetId={id}
      />
    </Modal>
  );
}
