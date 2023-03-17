import { useLoaderData } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { createBudget, fetchData } from '../helpers'

// components
import Intro from '../components/Intro'
import AddBudgetForm from '../components/AddBudgetForm'

// loader
export const dashboardLoader = async () => {
  const userName = await fetchData('userName')
  const budgets = await fetchData('budgets')
  return { userName, budgets }
}

// action
export const dashboardAction = async ({ request }) => {
  const data = await request.formData()
  const { _action, ...values } = Object.fromEntries(data)

  // new user submission
  if (_action === 'newUser') {
    try {
      localStorage.setItem('userName', JSON.stringify(values.userName))
      return enqueueSnackbar(`Welcome ${values.userName}`, {
        variant: 'success',
      })
    } catch (error) {
      throw new Error('There was a problem creating your account.')
    }
  } else if (_action === 'createBudget') {
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
  }
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData('userName')

  return (
    <>
      {userName ? (
        <div className='dashboard'>
          <h1>
            Welcome back, <span className='accent'>{userName}</span>
          </h1>
          <div className='grid-sm'>
            {budgets ? (
              <div className='grid-lg'>
                <div className='flex-lg'>
                  <AddBudgetForm />
                </div>
              </div>
            ) : (
              <div className='grid-lg'>
                <div className='flex-lg'>
                  <AddBudgetForm />
                </div>
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
