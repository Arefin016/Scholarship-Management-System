import { FaGoogle } from "react-icons/fa"
import useAuth from "../../hooks/useAuth"
import useAxiosPublic from "../../hooks/useAxiosPublic"
import { useNavigate } from "react-router-dom"

const SocialLogin = () => {
  const { googleSignIn } = useAuth()
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user)
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        image: result.user?.photoURL
      }
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data)
        navigate("/")
      })
    })
  }

  return (
    <div>
      <div className="divider"></div>
      <div>
        <button onClick={handleGoogleSignIn} className="btn w-3/4 ml-9 mb-4">
          <FaGoogle className=""></FaGoogle>
          Google
        </button>
      </div>
    </div>
  )
}

export default SocialLogin
