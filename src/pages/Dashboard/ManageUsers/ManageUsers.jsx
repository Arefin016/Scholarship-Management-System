import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { FaTrashAlt, FaUser } from "react-icons/fa"
import Swal from "sweetalert2"

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure()
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  })

  const handleMakeAdmin = user => {
    axiosSecure.patch(`/users/admin/${user._id}`)
    .then(res => {
        console.log(res.data)
        if(res.data.modifiedCount > 0){
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is an Admin Now!`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
  }

//   const handleMakeModerator = user => {
//     axiosSecure.patch(`/users/moderator/${user._id}`)
//     .then(res => {
//         console.log(res.data)
//         if(res.data.modifiedCount > 0){
//             refetch();
//             Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title: `${user.name} is an Moderator Now!`,
//                 showConfirmButton: false,
//                 timer: 1500
//               });
//         }
//     })
//   }



  const handleDeleteUser = (user) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/users/${user._id}`).then((res) => {
            if (res.data.deletedCount > 0) {
            refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              })
            }
          })
        }
      })
  }
  return (
    <div>
      <div className="flex md:flex-row flex-col justify-evenly">
        <h2 className="text-3xl">Manage Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <details className="dropdown">
                    <summary  className="m-1 btn btn-xs bg-blue-400"><FaUser></FaUser></summary>
                    {user.role === 'admin' ? 'Admin' : <ul className="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"> 
                      <li onClick={() => handleMakeAdmin(user)}>
                        <a>Admin</a>
                      </li>
                    </ul>}
                  </details>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-xs"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUsers
