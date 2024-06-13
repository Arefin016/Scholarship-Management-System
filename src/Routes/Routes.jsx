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
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile"
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile"
import AddReview from "../pages/Dashboard/AddReview/AddReview"
import MyReview from "../pages/Dashboard/MyReview/MyReview"
import ModeratorProfile from "../pages/Dashboard/ModeratorProfile/ModeratorProfile"
import ModeratorRoute from "./ModeratorRoute"
import ModeratorManageScho from "../pages/Dashboard/ModeratorManageScho/ModeratorManageScho"
import AllReviews from "../pages/Dashboard/AllReviews/AllReviews"
import AllAppliedScholarship from "../pages/Dashboard/AllAppliedScholarship/AllAppliedScholarship"
import ModeratorAddScholarship from "../pages/Dashboard/ModeratorAddScholarship/ModeratorAddScholarship"
import UpdateReview from "../pages/Dashboard/UpdateReview/UpdateReview"
import AdminManageAllScholarship from "../pages/Dashboard/AdminManageAllScholarship/AdminManageAllScholarship"
import ModeratorUpdateScho from "../pages/Dashboard/ModeratorUpdateScho/ModeratorUpdateScho"

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
        path: 'addReview/:id',
        element:<AddReview></AddReview>
      },
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>
      },
      {
        path: 'updateReview/:id',
        element:<UpdateReview></UpdateReview>,
        loader: ({params}) => fetch(`http://localhost:5000/addReview/${params.id}`)
      },
      {
        path:'myReview',
        element:<MyReview></MyReview>
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
        path: 'adminProfile',
        element:<AdminRoute><AdminProfile></AdminProfile></AdminRoute>
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
      },
      {
        path: 'manageAppliedScholarship',
        element: <AdminRoute><AdminManageAllScholarship></AdminManageAllScholarship></AdminRoute>
      },
      //moderator routes
      {
        path: 'moderatorProfile',
        element: <ModeratorRoute><ModeratorProfile></ModeratorProfile></ModeratorRoute>

      },
      {
        path: 'moderatorUpdateScholarship/:id',
        element: <ModeratorRoute><ModeratorUpdateScho></ModeratorUpdateScho></ModeratorRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/topScholarship/${params.id}`)

      },
      {
        path: 'moderatorManageScholarship',
        element: <ModeratorRoute><ModeratorManageScho></ModeratorManageScho></ModeratorRoute>
      },
      {
        path: 'allReviews',
        element: <ModeratorRoute><AllReviews></AllReviews></ModeratorRoute>
      },
      {
        path: 'allAppliedScholarship',
        element: <ModeratorRoute><AllAppliedScholarship></AllAppliedScholarship></ModeratorRoute>
      },
      {
        path: 'addScholarship',
        element: <ModeratorRoute><ModeratorAddScholarship></ModeratorAddScholarship></ModeratorRoute>
      }
    ],
  },
])
