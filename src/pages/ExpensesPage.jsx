import { useLoaderData } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { deleteItem, fetchData } from '../helpers'

// components
import Table from '../components/Table'

// loader
export const expensesLoader = async () => {
  const expenses = await fetchData('expenses')
  return { expenses }
}

// action
export const expensesAction = async ({ request }) => {
  const data = await request.formData()
  const { _action, ...values } = Object.fromEntries(data)

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

const ExpensesPage = () => {
  const { expenses } = useLoaderData()

  return (
    <div className='grid-lg'>
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className='grid-md'>
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  )
}

export default ExpensesPage
