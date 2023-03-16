import { useLoaderData } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { fetchData } from '../helpers'

// components
import Intro from '../components/Intro'

// loader
export const dashboardLoader = async () => {
  const userName = await fetchData('userName')
  return { userName }
}

// action
export const dashboardAction = async ({ request }) => {
  const data = await request.formData()
  const formData = Object.fromEntries(data)
  try {
    localStorage.setItem('userName', JSON.stringify(formData.userName))
    return enqueueSnackbar(`Welcome ${formData.userName}`, {
      variant: 'success',
    })
  } catch (error) {
    throw new Error('There was a problem creating you account.')
  }
}

const Dashboard = () => {
  const { userName } = useLoaderData('userName')

  return <>{userName ? <p>{userName}</p> : <Intro />}</>
}

export default Dashboard
