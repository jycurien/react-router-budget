import { useLoaderData } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { createExpense, deleteItem, getAllMatchingItems } from '../helpers'

// components
import AddExpenseForm from '../components/AddExpenseForm'
import BudgetItem from '../components/BudgetItem'
import Table from '../components/Table'

// loader
export const budgetLoader = async ({ params }) => {
  const budget = await getAllMatchingItems({
    category: 'budgets',
    key: 'id',
    value: params.id,
  })[0]

  if (!budget) {
    throw new Error('The Budget you are trying to find does not exist')
  }

  const expenses = await getAllMatchingItems({
    category: 'expenses',
    key: 'budgetId',
    value: params.id,
  })

  return { budget, expenses }
}

// action
export const budgetAction = async ({ request }) => {
  const data = await request.formData()
  const { _action, ...values } = Object.fromEntries(data)

  if (_action === 'createExpense') {
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
  }

  if (_action === 'deleteExpense') {
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
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData()
  return (
    <div className='grid-lg' style={{ '--accent': budget.color }}>
      <h1 className='h2'>
        <span className='accent'>{budget.name} </span>Overview
      </h1>
      <div className='flex-lg'>
        <BudgetItem budget={budget} showDelete />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className='grid-md'>
          <h2>
            <span className='accent'>{budget.name} </span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  )
}

export default BudgetPage
