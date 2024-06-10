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
import AddScholarship from "../pages/Dashboard/AddScholarship/AddScholarship"
import AdminRoute from "./AdminRoute"
import ManageScholarship from "../pages/Dashboard/ManageScholarship/ManageScholarship"
import UpdateScholarship from "../pages/Dashboard/UpdateScholarship/UpdateScholarship"
import Payment from "../pages/Dashboard/Payment/Payment"
import PaymentUserInformation from "../pages/Dashboard/PaymentUserInformation/PaymentUserInformation"

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
        loader: () => fetch('http://localhost:5000/topScholarshipCount')
      },
      {
        path: "AllScholarship/:id",
        element: (
          <PrivateRoute>
            <AllScholarShipDetailsPage></AllScholarShipDetailsPage>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/topScholarship/${params.id}`),
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
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // normal user route
      {
        path: "myApplication",
        element: <MyApplication></MyApplication>,
      },
      {
        path: "payment",
        element: <Payment></Payment>
      },
      {
        path: 'paymentUserInformation',
        element: <PaymentUserInformation></PaymentUserInformation>
      },
      // admin routes
      {
        path: "manageUsers",
        element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
      },
      {
        path: 'manageScholarship',
        element: <AdminRoute><ManageScholarship></ManageScholarship></AdminRoute>
      },
      {
        path:'updateScholarship/:id',
        element:<AdminRoute><UpdateScholarship></UpdateScholarship></AdminRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/topScholarship/${params.id}`)
      },
      {
        path: 'adminAddScholarship',
        element: <AdminRoute><AddScholarship></AddScholarship></AdminRoute>
      }
    ],
  },
])
