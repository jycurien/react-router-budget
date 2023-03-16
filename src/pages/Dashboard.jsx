import { useLoaderData } from 'react-router-dom'
import { fetchData } from '../helpers'

// loader
export const dashboardLoader = async () => {
  const userName = await fetchData('userName')
  return { userName }
}

const Dashboard = () => {
  const { userName } = useLoaderData('userName')

  return (
    <div>
      <h1>{userName}</h1>
      Dashboard
    </div>
  )
}

export default Dashboard
