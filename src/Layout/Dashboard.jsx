import { FaAd, FaAddressBook,  FaHome, FaSearch, FaUser } from "react-icons/fa"
import { NavLink, Outlet } from "react-router-dom"

const Dashboard = () => {
  return (
    <div className="flex lg:flex-row flex-col">
      {/* dashboard side bar */}
      <div className="w-56 min-h-screen bg-gray-300">
        <ul className="menu p-4">
          <li>
            <NavLink to="/dashboard/myProfile">
              <FaUser></FaUser>
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myApplication">
              <FaAddressBook></FaAddressBook>
              My Application
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myReview">
              <FaAd></FaAd>
              My Review
            </NavLink>
          </li>
          <div className="divider"></div> 
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/AllScholarShip">
              <FaSearch></FaSearch>
              All Scholarship
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-2">
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Dashboard
