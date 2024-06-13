import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useApply from "../../../hooks/useApply";

const ModeratorManageScho = () => {
    const [apply, , refetch] = useApply()
    const axiosSecure = useAxiosSecure()

    const handleDeleteManageScholarship = (item) => {
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
            const res = await axiosSecure.delete(`/topScholarship/${item._id}`)
            // console.log(res.data);
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
    return (
        <div>
            <SectionTitle heading={"Manage Scholarship"}></SectionTitle>
            <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Scholarship Name</th>
                <th>University Name</th>
                <th>Subject Category</th>
                <th>Application Fees</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {apply.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.scholarshipCategory}</td>
                  <td>{item.universityName}</td>
                  <td>{item.subjectCategory}</td>
                  <td className="text-right">${item.applicationFees}</td>
                  <th>
                    <Link to={`/AllScholarship/${item._id}`}>
                      <button className="btn btn-ghost btn-xs">
                        <TbListDetails></TbListDetails>
                      </button>
                    </Link>

                    {/* 2040 */}
                    <Link to={`/dashboard/moderatorUpdateScholarship/${item._id}`}>
                      <button className="btn btn-ghost btn-xs">
                        <FaEdit></FaEdit>
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDeleteManageScholarship(item)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrashAlt className="text-red-600"></FaTrashAlt>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </div>
    );
};

export default ModeratorManageScho;