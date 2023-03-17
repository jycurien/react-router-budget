import { enqueueSnackbar } from 'notistack'
import { redirect } from 'react-router-dom'

// helpers
import { deleteItem } from '../helpers'

const logoutAction = async () => {
  // delete the user
  deleteItem({
    key: 'userName',
  })
  deleteItem({
    key: 'budgets',
  })
  deleteItem({
    key: 'expenses',
  })
  enqueueSnackbar('You have deleted you account!', {
    variant: 'success',
  })
  // return redirect
  return redirect('/')
}

export default logoutAction
