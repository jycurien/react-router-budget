import { redirect } from 'react-router-dom'

// helpers
import { deleteItem } from '../helpers'

const logoutAction = async () => {
  // delete the user
  deleteItem({
    key: 'userName',
  })
  // return redirect
  return redirect('/')
}

export default logoutAction
