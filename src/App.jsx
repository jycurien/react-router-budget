import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

// Layouts
import Main, { mainLoader } from './layouts/Main'

// Actions
import logoutAction from './actions/logout'

// Routes
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from './pages/ExpensesPage'
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard'
import Error from './pages/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        action: dashboardAction,
        loader: dashboardLoader,
      },
      {
        path: 'expenses',
        element: <ExpensesPage />,
        action: expensesAction,
        loader: expensesLoader,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
])

function App() {
  return (
    <div className='App'>
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
    </div>
  )
}

export default App
