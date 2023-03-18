import { enqueueSnackbar } from 'notistack'
import { redirect } from 'react-router-dom'
import { deleteItem, getAllMatchingItems } from '../helpers'

const deleteBudget = ({ params }) => {
  try {
    deleteItem({
      key: 'budgets',
      id: params.id,
    })

    const associatedExpenses = getAllMatchingItems({
      category: 'expenses',
      key: 'budgetId',
      value: params.id,
    })

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: 'expenses',
        id: expense.id,
      })
    })

    enqueueSnackbar('Budget deleted successfully!', {
      variant: 'success',
    })

    return redirect('/')
  } catch (error) {
    throw new Error('There was a problem deleting your budget.')
  }
}

export default deleteBudget
