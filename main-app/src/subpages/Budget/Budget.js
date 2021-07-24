import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from './BudgetCss';
import { BudgetSelector } from './components/BudgetSelector';
import { Button, SuspenseErrorBoundary } from 'components';
import {
  BudgetTransactionList,
  BudgetCategoryList,
  SelectedTransactionModal,
  AddTransactionFormView,
  AddBudgetFormView,
  AddCategoryFormView,
} from 'subpages/Budget/components';
import { BudgetContext } from './BudgetContext';
import { Context } from 'Context';
import EditTransactionFormView from './components/Forms/EditTransactionFormView/EditTransactionFormView';

export default function Budget() {
  const { isBigScreen, isTabletOrMobile, isPhone } = useContext(Context);
  console.log(isBigScreen);
  return (
    <BudgetContext.ContextProvider>
      <Grid isBigScreen={isBigScreen} isTabletOrMobile={isTabletOrMobile} isPhone={isPhone}>
        <section>
          <BudgetSelector />
          <Button to="/HomePage/budget/new">Add new Budget</Button>
          <SuspenseErrorBoundary>
            <BudgetCategoryList />
          </SuspenseErrorBoundary>
          <Button to="/HomePage/budget/category/new">Add new Category</Button>
        </section>
        <section></section>
        <section>
          <SuspenseErrorBoundary>
            <Button to="/HomePage/budget/transactions/new">Add new Transaction</Button>
            <BudgetTransactionList />
          </SuspenseErrorBoundary>
        </section>
      </Grid>
      <Switch>
        <Route path="/HomePage/budget/transactions/new">
          <AddTransactionFormView />
        </Route>
        <Route path="/HomePage/budget/new">
          <AddBudgetFormView />
        </Route>
        <Route path="/HomePage/budget/category/new">
          <AddCategoryFormView />
        </Route>
        <Route path="/HomePage/budget/transaction/">
          <EditTransactionFormView />
        </Route>
        <Route path="/HomePage/budget/transactions">
          <SelectedTransactionModal />
        </Route>
      </Switch>
    </BudgetContext.ContextProvider>
  );
}
