import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main"
import Home from "../pages/Home/Home/Home"
import AllScholarship from "../pages/AllScholarship/AllScholarship"
import ErrorPage from "../pages/ErrorPage/ErrorPage"

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

        }
    ]
  },
])
