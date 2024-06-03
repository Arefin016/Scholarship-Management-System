import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main"
import Home from "../pages/Home/Home/Home"
import AllScholarship from "../pages/AllScholarship/AllScholarship"
import ErrorPage from "../pages/ErrorPage/ErrorPage"
import Login from "../pages/Login/Login"
import SignUp from "../pages/SignUp/SignUp"
import PrivateRoute from "./PrivateRoute"
import Secret from "../pages/Shared/Secret/Secret"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'AllScholarship',
            element: <AllScholarship></AllScholarship>

        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        }
    ]
  },
])
