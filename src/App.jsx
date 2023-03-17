import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

// Layouts
import Main, { mainLoader } from './layouts/Main'

// Actions
import logoutAction from './actions/logout'

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard'
import BudgetPage, { budgetAction, budgetLoader } from './pages/BudgetPage'
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from './pages/ExpensesPage'
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
        errorElement: <Error />,
      },
      {
        path: 'budget/:id',
        element: <BudgetPage />,
        action: budgetAction,
        loader: budgetLoader,
        errorElement: <Error />,
      },
      {
        path: 'expenses',
        element: <ExpensesPage />,
        action: expensesAction,
        loader: expensesLoader,
        errorElement: <Error />,
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
