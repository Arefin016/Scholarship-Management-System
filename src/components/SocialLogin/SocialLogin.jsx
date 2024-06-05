import { FaGoogle } from "react-icons/fa"
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const {googleSignIn} = useAuth();

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(result => {
      console.log(result.user);
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
