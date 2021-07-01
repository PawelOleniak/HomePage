import React,{ Fragment, useEffect, useMemo } from 'react'
import { connect } from "react-redux";
import { fetchBudget, fetchBudgetedCategories, addTransaction } from "data/actions/budgetActions"
import { fetchAllCategories } from 'data/actions/commonActions';
import { Grid } from './BudgetCss';
import { LoadingIndicator , Modal, Button } from 'components';
import BudgetCategoryList from './components/BudgetCategoryList/BudgetCategoryList';
import BudgetTransactionList from './components/BudgetTransactionList';
import { Switch, Route, useHistory } from "react-router-dom";
import { AddTransactionForm } from "./components/AddTransactionForm";

 function Budget({
      budgetState, commonState, allCategories, budget,
      fetchBudget, fetchBudgetedCategories, fetchAllCategories, addTransaction }) {

    const history = useHistory();
    useEffect(() => {
        fetchBudget(1)
        fetchBudgetedCategories(1)
        fetchAllCategories();
      },[fetchBudget,fetchBudgetedCategories,fetchAllCategories])
      const isLoaded = useMemo(
          () =>(!!commonState  && Object.keys(commonState).length === 0) &&
               (!!budgetState && Object.keys(budgetState).length === 0)
          ,[commonState,budgetState]);

    const handleSubmitAddTransaction = (values) => {
      addTransaction({
        budgetId:budget.id,
        data: values
      }).then(() =>
      history.goBack()
      )
    }

    return (
      <Fragment>
        <Grid>
            <section>
                {isLoaded ? <BudgetCategoryList/>
                :
                <LoadingIndicator/>
                }
            </section>
            <section></section>
            <section>
                {isLoaded ?
                <Fragment>
                  <Button to="/budget/transactions/new" >Add new Transaction</Button>
                  <BudgetTransactionList/>
                </Fragment>

                : <LoadingIndicator/>}
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

        </Switch>
      </Fragment>
    )


}

export default connect(state=>{
    return{
      budget: state.budget.budget,
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
      allCategories: state.common.allCategories
    }

  },{
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories,
    addTransaction
  })(Budget)