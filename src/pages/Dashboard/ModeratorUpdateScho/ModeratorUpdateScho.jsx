import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaRegAddressCard } from "react-icons/fa";

const ModeratorUpdateScho = () => {
    const { universityName, scholarshipCategory, applicationFees, _id } =
    useLoaderData()
    const { register, handleSubmit } = useForm()

    const axiosSecure = useAxiosSecure()
  const onSubmit = async (data) => {
    console.log(data)
    if (data) {
      //now send the add scholarship item data to the server
      const updateScholarShipItem = {
        applicationFees: data.applicationFees,
        degreeCategory: data.degreeCategory,
        scholarshipCategory: data.scholarshipCategory,
        subjectCategory: data.subjectCategory,
        universityName: data.universityName,
      }
      //
      const addScholarshipRes = await axiosSecure.patch(
        `/topScholarship/${_id}`,
        updateScholarShipItem
      )
      console.log(addScholarshipRes.data)
      if (addScholarshipRes.data.modifiedCount > 0) {
        // show success popup
        //   reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.scholarshipCategory} is added to the database`,
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
    //   console.log("with image url", res.data)
  }
    return (
        <div>
            <SectionTitle heading={"Moderator Update Scholarship"}></SectionTitle>
            <div className="mt-5">
        {/* From starting */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*Scholarship Name and University Name  */}
          <div className="flex md:flex-row flex-col gap-3">
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Scholarship Name</span>
              </div>
              <input
                {...register("scholarshipCategory", { required: true })}
                required
                defaultValue={scholarshipCategory}
                type="text"
                placeholder="Scholarship Name"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">University Name</span>
              </div>
              <input
                {...register("universityName", { required: true })}
                type="text"
                defaultValue={universityName}
                placeholder="University Name"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          {/* University World Rank and Application Fees */}
          <div className="flex md:flex-row flex-col gap-3">
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Application Fees</span>
              </div>
              <input
                {...register("applicationFees", { required: true })}
                type="number"
                defaultValue={applicationFees}
                placeholder="Application Fees"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          {/* Subject category and Scholarship category */}
          <div className="flex md:flex-row flex-col gap-3">
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Subject Category</span>
              </div>
              <select
                {...register("subjectCategory", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="agriculture">Agriculture</option>
                <option value="engineering">Engineering</option>
                <option value="doctor">Doctor</option>
              </select>
            </label>
          </div>

          {/* Degree and Tuition Fees */}
          <div className="flex md:flex-row flex-col gap-3">
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Degree Category</span>
              </div>
              <select
                {...register("degreeCategory", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="diploma">Diploma</option>
                <option value="bachelor">Bachelor</option>
                <option value="masters">Masters</option>
              </select>
            </label>
          </div>
          <button className="btn mt-5">
            Update Scholarship <FaRegAddressCard></FaRegAddressCard>
          </button>
        </form>
      </div>
        </div>
    );
};

export default ModeratorUpdateScho;