import { useContext } from "react"
import { Helmet } from "react-helmet-async"
import { AuthContext } from "../../providers/AuthProvider"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import SocialLogin from "../../components/SocialLogin/SocialLogin"

const Login = () => {
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const locaton = useLocation()

  const from = locaton.state?.from?.pathname || "/"
  console.log("state in the location login page", location.state)

  const handleLogin = (event) => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value
    console.log(email, password)
    signIn(email, password)
      .then((result) => {
        const user = result.user
        console.log(user)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        })
        navigate(from, { replace: true })
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <Helmet>
        <title>Scholar || Login</title>
      </Helmet>
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-4">Login Please!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
          
          <p className="text-center mb-2 font-medium">
            <small>
              New Here?{" "}
              <Link className="text-blue-600" to="/signup">
                Create an account
              </Link>
            </small>
          </p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
      
    </div>
  )
}

export default Login
