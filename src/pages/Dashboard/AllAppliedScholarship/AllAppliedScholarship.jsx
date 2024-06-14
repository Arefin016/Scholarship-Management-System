import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { TbListDetails } from "react-icons/tb";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAllApply from "../../../hooks/useAllApply";

const AllAppliedScholarship = () => {


    const [submits, , refetch] = useAllApply()
    const { register, } = useForm()
    console.log(submits)
  
    const axiosSecure = useAxiosSecure()
  
    const handleDeleteReview = (apply) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.delete(`/submits/${apply._id}`)
  
          if (res.data.deletedCount > 0) {
            // refeth to update the ui
            refetch()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${apply.universityName} is deleted`,
              showConfirmButton: false,
              timer: 1500,
            })
          }
        }
      })
    }
  


    return (
        <div>
      <SectionTitle heading={"Manage Applied Scholarship"}></SectionTitle>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>University Name</th>
                <th>Scholarship Name</th>
                <th>Subject Category</th>
                {/* <th>Applied Degree</th> */}
                <th>Application Fees</th>
                <th>Application Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submits.map((apply, index) => (
                <tr key={apply._id}>
                  <td>{index + 1}</td>
                  <td>{apply.universityName}</td>
                  <td>{apply.scholarshipCategory}</td>
                  <td>{apply.subjectCategory}</td>
                  <td>$ {apply.applicationFees}</td>
                  <div className="flex flex-col">
                    <td>
                      <button className="btn btn-sm">Pending</button>
                    </td>
                    <td>
                      <button className="btn btn-sm">Processing</button>
                    </td>
                    <td>
                      <button className="btn btn-sm">Completed</button>
                    </td>
                  </div>
                  <td>
                    <Link to={`/AllScholarship`}>
                      <button className="btn btn-ghost btn-xs">
                        <TbListDetails></TbListDetails>
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteReview(apply)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrashAlt className="text-red-600"></FaTrashAlt>
                    </button>
                    {/* <button
                    className="btn btn-ghost btn-xs"
                  >
                    <FaComment className="text-red-600"></FaComment>
                  </button> */}
                    <button
                      className="btn btn-sm"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      Feedback
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Feedback</h3>
                        <div className="flex md:flex-row flex-col gap-3">
                          <label className="form-control w-full">
                            <textarea
                              {...register("reviewComment")}
                              className="textarea textarea-bordered h-24 w-full"
                              placeholder="Bio"
                            ></textarea>
                          </label>
                        </div>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Add Feedback</button>
                            <button className="btn ml-3">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
};

export default AllAppliedScholarship;