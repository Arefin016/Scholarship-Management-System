import { FaEdit, FaTrashAlt } from "react-icons/fa"
import useSubmit from "../../../hooks/useSubmit"
import { TbListDetails } from "react-icons/tb"
import Swal from "sweetalert2"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { Link } from "react-router-dom"

const MyApplication = () => {
  //cart =submit
  const [submit, refetch] = useSubmit()
  const totalApplicationFees = submit.reduce(
    (total, item) => total + parseInt(item.applicationFees),
    0
  )
  console.log(totalApplicationFees)
  const axiosSecure = useAxiosSecure()

  const handleDelete = (id) => {
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
        axiosSecure.delete(`/submits/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch()
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
      <div className="flex lg:justify-evenly flex-col lg:flex-row">
        <h2 className="text-4xl">Items: {submit.length}</h2>
        <h2 className="text-4xl">Total Price: {totalApplicationFees}</h2>
        {submit.length ? (
          <Link to="/dashboard/payment">
            <button className="btn btn-success">Apply Scholarship</button>
          </Link>
        ) : (
          <button disabled className="btn btn-success">
            Apply Scholarship
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>University Name</th>
              <th>Address</th>
              <th>Subject</th>
              <th>Application Fees</th>
              <th>Action</th>
              <th>Add Review</th>
            </tr>
          </thead>
          <tbody>
            {submit.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.universityName}</td>
                <td>
                  {item.universityLocation.country}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    City: {item.universityLocation.city}
                  </span>
                </td>
                <td>{item.subjectCategory}</td>
                <td>${item.applicationFees}</td>
                <td>
                  {/* <button className="btn btn-ghost btn-xs">
                    <TbListDetails></TbListDetails>
                  </button> */}
                  <Link to={`/AllScholarship`}>
                    <button className="btn btn-ghost btn-xs">
                      <TbListDetails></TbListDetails>
                    </button>
                  </Link>
                  {/* <button className="btn btn-ghost btn-xs">
                    <FaEdit></FaEdit>
                  </button> */}
                  <Link to={`/dashboard/updateScholarship/${item._id}`}>
                    <button className="btn btn-ghost btn-xs">
                      <FaEdit></FaEdit>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
                <td>
                  <Link to={`/dashboard/addReview/${item._id}`}>
                    <button className="btn btn-ghost">Add Review</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyApplication
