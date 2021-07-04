import React, { Fragment, useEffect, useMemo } from 'react'
import { connect } from "react-redux";
import {
  fetchBudget,
  fetchBudgetedCategories,
  addTransaction,
  addBudgetedCategory,
  addParentCategory,
  addBudget
} from "data/actions/budgetActions"
import { fetchAllCategories, addCategory } from 'data/actions/commonActions';
import { Grid } from './BudgetCss';
import { LoadingIndicator, Modal, Button } from 'components';
import BudgetCategoryList from './components/BudgetCategoryList/BudgetCategoryList';
import BudgetTransactionList from './components/BudgetTransactionList';
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { AddBudgetForm, AddCategoryForm, AddTransactionForm } from "./components/Forms";
import { TransactionItem } from "./components/BudgetTransactionList/TransactionItem";

function Budget({
  budgetState, commonState, allCategories, budget, budgets,
  fetchBudget, fetchBudgetedCategories, fetchAllCategories, addTransaction,
  addBudgetedCategory, addCategory, addParentCategory, addBudget }) {

  const history = useHistory();
  useEffect(() => {
    fetchBudget(1)
    fetchBudgetedCategories(1)
    fetchAllCategories();
  }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories])
  const isLoaded = useMemo(
    () => (!!commonState && Object.keys(commonState).length === 0) &&
      (!!budgetState && Object.keys(budgetState).length === 0)
    , [commonState, budgetState]);

  const handleSubmitAddTransaction = (values) => {
    addTransaction({
      budgetId: budget.id.toString(),
      data: values
    }).then(() =>
      history.goBack()
    )
  }
  const handleSubmitAddCategory = (values) => {
    addCategory({
      data: {
        id: (lastcategoryId + 1).toString(),
        name: values.name,
        parentCategoryId: (values.newParentCategory?
          parseInt (values.parentCategoryId)+1:
          values.parentCategoryId)
          .toString()
      }
    })

    if (values.budgeted) {
      addBudgetedCategory({
        data: {
          id: (lastcategoryId + 1).toString(),
          budget: values.budget,
          categoryId: (lastcategoryId + 1).toString(),
          budgetId: values.budgetId
        }
      })
    }

    if (values.newParentCategory) {
      addParentCategory({
        data: {
          id: (lastParentcategoryId + 1).toString(),
          name: values.newParentCategoryName
        }
      })
    }
    fetchAllCategories();
    history.goBack()

  }

  const handleSubmitAddBudget = (values) => {
    const data = {
      id: values.id,
      name: values.name,
      totalAmount: values.totalAmount
    }
    addBudget({
      data: data
    }).then(() =>
      history.goBack()
    )
  }

  const lastcategoryId = useMemo(
    () => {
      if (isLoaded) {
        return parseInt(allCategories[allCategories.length - 1].id);
      }
      else return 0;
    }
    , [allCategories, isLoaded])

  const lastParentcategoryId = useMemo(
    () => {
      if (isLoaded) {
        return Math.max.apply(Math, allCategories.map(
          (category) => { return category.parentCategoryId; }));
      }
      else return 0;
    }
    , [allCategories, isLoaded])

  let location = useLocation();
  const selectedTransactionId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

  const selectedTransaction = useMemo(
    () => {
      if (typeof selectedTransactionId === 'undefined') {
        return budget.transactions
      }
      if (typeof budget.transactions === 'undefined') {
        return budget.transactions
      }
      return budget.transactions
        .find(transaction => transaction.id === selectedTransactionId)
    },
    [selectedTransactionId, budget.transactions]
  );


  return (
    <Fragment>
      <Grid>
        <section>
          <Button to="/budget/new">Add new Budget</Button>
          {isLoaded ? <BudgetCategoryList />
            :
            <LoadingIndicator />
          }
          <Button to="/budget/category/new">Add new Category</Button>

        </section>
        <section></section>
        <section>
          {isLoaded ?
            <Fragment>
              <Button to="/budget/transactions/new" >Add new Transaction</Button>
              <BudgetTransactionList />
            </Fragment>

            : <LoadingIndicator />}
        </section>
      </Grid>
      <Switch>
        <Route path="/budget/transactions/new">
          <Modal>
            <AddTransactionForm
              categories={allCategories}
              groupedCategoriesBy="parentCategory.name"
              onSubmit={handleSubmitAddTransaction}
            />
          </Modal>
        </Route>
        <Route path="/budget/transactions">
          <Modal>
            <TransactionItem transactions={selectedTransaction} allCategories={allCategories} selected={true} />
          </Modal>
        </Route>
        <Route path="/budget/new">
          <Modal>
            <AddBudgetForm onSubmit={handleSubmitAddBudget} />
          </Modal>
        </Route>
        <Route path="/budget/category/new">
          <Modal>
            <AddCategoryForm
              categories={allCategories}
              budgets={budgets}
              onSubmit={handleSubmitAddCategory}
            />
          </Modal>
        </Route>

      </Switch>
    </Fragment>
  )


}

export default connect(state => {
  return {
    budget: state.budgets.budget,
    budgets: state.budgets,
    commonState: state.common.loadingState,
    budgetState: state.budgets.loadingState,
    allCategories: state.common.allCategories,
  }

}, {
  fetchBudget,
  fetchBudgetedCategories,
  fetchAllCategories,
  addTransaction,
  addBudgetedCategory,
  addCategory,
  addParentCategory,
  addBudget
})(Budget)