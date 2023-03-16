import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Layouts
import Main, { mainLoader } from './layouts/Main'

// Actions
import logoutAction from './actions/logout'

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard'
import Error from './pages/Error'
import { SnackbarProvider } from 'notistack'

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
