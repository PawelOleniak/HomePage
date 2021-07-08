import React from 'react'
import { Switch, Route } from "react-router-dom";
import { Grid } from './BudgetCss';
import { BudgetSelector } from './components/BudgetSelector';
import { Button, SuspenseErrorBoundary } from 'components';
import {
  BudgetTransactionList, BudgetCategoryList, SelectedTransactionModal,
  AddTransactionFormView, AddBudgetFormView, AddCategoryFormView
} from 'subpages/Budget/components';
import { BudgetContext } from './BudgetContext';

export default function Budget() {
  return (
    <BudgetContext.ContextProvider>
      <Grid>
        <section>
          <BudgetSelector/>
          <Button to="/budget/new">Add new Budget</Button>
          <SuspenseErrorBoundary>
            <BudgetCategoryList />
          </SuspenseErrorBoundary>
          <Button to="/budget/category/new">Add new Category</Button>
        </section>
        <section></section>
        <section>
          <SuspenseErrorBoundary>
            <Button to="/budget/transactions/new" >Add new Transaction</Button>
            <BudgetTransactionList />
          </SuspenseErrorBoundary>
        </section>
      </Grid>
      <Switch>
        <Route path="/budget/transactions/new">
          <AddTransactionFormView />
        </Route>
        <Route path="/budget/new">
          <AddBudgetFormView />
        </Route>
        <Route path="/budget/category/new">
          <AddCategoryFormView />
        </Route>
        <Route path="/budget/transactions">
          <SelectedTransactionModal />
        </Route>
      </Switch>
    </BudgetContext.ContextProvider>
  )
}