import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main"
import Home from "../pages/Home/Home/Home"
import AllScholarship from "../pages/AllScholarship/AllScholarship"
import ErrorPage from "../pages/ErrorPage/ErrorPage"
import Login from "../pages/Login/Login"
import SignUp from "../pages/SignUp/SignUp"
import PrivateRoute from "./PrivateRoute"
import Secret from "../pages/Shared/Secret/Secret"
import AllScholarShipDetailsPage from "../pages/AllScholarship/AllScholarShipDetailsPage"
import Dashboard from "../Layout/Dashboard"
import MyApplication from "../pages/Dashboard/MyApplication/MyApplication"
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "AllScholarship",
        element: <AllScholarship></AllScholarship>,
      },
      {
        path: "AllScholarship/:id",
        element:<PrivateRoute><AllScholarShipDetailsPage></AllScholarShipDetailsPage></PrivateRoute>,
        // element:<AllScholarShipDetailsPage></AllScholarShipDetailsPage>,
        loader: ({params}) => fetch(`http://localhost:5000/topScholarship/${params.id}`)
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "secret",
        element: (
          <PrivateRoute>
            <Secret></Secret>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'myApplication',
        element: <MyApplication></MyApplication>
      },
      // admin routes
      {
        path: 'manageUsers',
        element:<ManageUsers></ManageUsers>
      }
    ]
  }
])
