import { Link } from "react-router-dom"
import logo from "../../../assets/home/ScholershipLogo.png"
import { useContext } from "react"
import { AuthContext } from "../../../providers/AuthProvider"
// import { FaAddressCard } from "react-icons/fa";
import useSubmit from "../../../hooks/useSubmit";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [submit] = useSubmit();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error))
  }

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/AllScholarship">All Scholarship</Link>
      </li>
      {/* <li>
        <Link to="/secret">Secret</Link>
      </li> */}
      <li>
        <Link to="/dashboard/myApplication">
          {/* <button className="btn">
            <FaAddressCard className="mr-2"></FaAddressCard>
            <div className="badge badge-secondary">+{submit.length}</div>
          </button> */}
          Dashboard
        </Link>
      </li>
    </>
  )

  return (
    <>
      <div className="navbar pt-2 fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <img className="md:h-16 h-10 md:w-20 w-10" src={logo} alt="" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div className="lg:tooltip lg:mt-4" data-tip={user?.displayName}>
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={user?.photoURL} />
                  </div>
                </div>
              </div>
              <button onClick={handleLogOut} className="btn lg:mt-2 ml-2">
                LogOut
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <li className="btn">Login</li>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default NavBar
