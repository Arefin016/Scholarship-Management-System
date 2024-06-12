import { TbListDetails } from "react-icons/tb"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import useReview from "../../../hooks/useReview"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import Swal from "sweetalert2"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { Link } from "react-router-dom"

const MyReview = () => {
  const [addReview, ,refetch] = useReview();
  const axiosSecure = useAxiosSecure();


  const handleDeleteReview = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/addReview/${item._id}`)
         
        if (res.data.deletedCount > 0) {
          // refeth to update the ui
          refetch()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.universityName} is deleted`,
            showConfirmButton: false,
            timer: 1500,
          })
        }
        
      }
    })
  }


  // console.log(review)
  return (
    <div>
      <SectionTitle heading={"My Review"}></SectionTitle>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Scholarship name</th>
              <th>university name</th>
              <th>Review comments</th>
              <th>Review date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {addReview?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                      {item.scholarshipName}
                </td>
                <td>{item.universityName}</td>
                <td>{item.reviewComment}</td>
                <td>{item.reviewDate}</td>
                <td>
                <td>
                  {/* <button className="btn btn-ghost btn-xs">
                    <TbListDetails></TbListDetails>
                  </button> */}
                  {/* virat@kholi.com */}
                  <Link to={`/dashboard/updateReview/${item._id}`}>
                  <button className="btn btn-ghost btn-xs">
                    <FaEdit></FaEdit>
                  </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteReview(item)}
                    className="btn btn-ghost btn-xs"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyReview
