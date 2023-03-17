import { Link, useLoaderData } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { createBudget, createExpense, deleteItem, fetchData } from '../helpers'

// components
import Intro from '../components/Intro'
import AddBudgetForm from '../components/AddBudgetForm'
import AddExpenseForm from '../components/AddExpenseForm'
import BudgetItem from '../components/BudgetItem'
import Table from '../components/Table'

// loader
export const dashboardLoader = async () => {
  const userName = await fetchData('userName')
  const budgets = await fetchData('budgets')
  const expenses = await fetchData('expenses')
  return { userName, budgets, expenses }
}

// action
export const dashboardAction = async ({ request }) => {
  const data = await request.formData()
  const { _action, ...values } = Object.fromEntries(data)

  // new user submission
  switch (_action) {
    case 'newUser':
      try {
        localStorage.setItem('userName', JSON.stringify(values.userName))
        return enqueueSnackbar(`Welcome ${values.userName}`, {
          variant: 'success',
        })
      } catch (error) {
        throw new Error('There was a problem creating your account.')
      }
    case 'createBudget':
      try {
        createBudget({
          name: values.newBudget,
          amount: values.newBudgetAmount,
        })
        return enqueueSnackbar('Budget created!', {
          variant: 'success',
        })
      } catch (error) {
        throw new Error('There was a problem creating your budget.')
      }
    case 'createExpense':
      try {
        createExpense({
          name: values.newExpense,
          amount: values.newExpenseAmount,
          budgetId: values.newExpenseBudget,
        })
        return enqueueSnackbar(`Expense ${values.newExpense} created!`, {
          variant: 'success',
        })
      } catch (error) {
        throw new Error('There was a problem creating your expense.')
      }
    case 'deleteExpense':
      try {
        deleteItem({
          key: 'expenses',
          id: values.expenseId,
        })
        return enqueueSnackbar(`Expense deleted!`, {
          variant: 'success',
        })
      } catch (error) {
        throw new Error('There was a problem deleting your expense.')
      }
    default:
      break
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData('userName')

  return (
    <>
      {userName ? (
        <div className='dashboard'>
          <h1>
            Welcome back, <span className='accent'>{userName}</span>
          </h1>
          <div className='grid-sm'>
            {budgets && budgets.length > 0 ? (
              <div className='grid-lg'>
                <div className='flex-lg'>
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className='budgets'>
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className='grid-md'>
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to='expenses' className='btn btn--dark'>
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className='grid-sm'>
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget ot get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  )
}

export default Dashboard
