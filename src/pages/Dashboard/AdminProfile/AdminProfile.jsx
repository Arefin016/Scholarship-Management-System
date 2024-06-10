import useAuth from "../../../hooks/useAuth"

const AdminProfile = () => {
  const { user } = useAuth()
  console.log(user)
  return (
    <div className="card w-96 mx-auto mt-5 bg-base-100 shadow-xl">
      <figure>
        <img
          src={user?.photoURL}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Name: {user?.displayName}</h2>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  )
}

export default AdminProfile
