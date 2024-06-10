import { FaAd, FaAddressBook, FaAddressCard, FaEnvelope, FaHome, FaSchool, FaSearch, FaStreetView, FaUser, } from "react-icons/fa"
import { NavLink, Outlet } from "react-router-dom"
import useSubmit from "../hooks/useSubmit"
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  //cart = submit
  const [submit] = useSubmit();

  //TODO: get isAdmin value from the database
  const [isAdmin] = useAdmin();
  // const [] = useAdmin();

  return (
    <div className="flex lg:flex-row flex-col">
      {/* dashboard side bar */}
      <div className="w-56 min-h-screen bg-gray-300">
        <ul className="menu p-4">
          {
            isAdmin ? <>
            <li>
            <NavLink to="/dashboard/adminProfile">
              <FaUser></FaUser>
              Admin Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/adminAddScholarship">
              <FaAddressBook></FaAddressBook>
              Add Scholarship
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageScholarship">
              <FaSchool></FaSchool>
              Manage Scholarship
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageAppliedScholarship">
              <FaAddressCard></FaAddressCard>
              Manage Applied Application
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageUsers">
              <FaUser></FaUser>
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageReview">
              <FaStreetView></FaStreetView>
              Manage Review
            </NavLink>
          </li>
            </>
            :
            <>
            <li>
            <NavLink to="/dashboard/myProfile">
              <FaUser></FaUser>
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myApplication">
              <FaAddressBook></FaAddressBook>
              My Application ({submit.length})
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myReview">
              <FaAd></FaAd>
              My Review
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentUserInformation">
              <FaAd></FaAd>
              Payment User Information
            </NavLink>
          </li>
            </>
          }
          {/* shared nav links */}
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
          <li>
            <NavLink to="/contact">
              <FaEnvelope></FaEnvelope>
              Contact
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
