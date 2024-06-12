import { useLoaderData } from "react-router-dom"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import { FaRegAddressCard } from "react-icons/fa"
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../hooks/useAxiosPublic"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import Swal from "sweetalert2"
import useAuth from "../../../hooks/useAuth"

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateReview = () => {
  const {ratingPoint, reviewDate, scholarshipName, universityName, reviewComment, _id} = useLoaderData()
  const { register, handleSubmit, reset } = useForm()
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
//   console.log(item)
  const onSubmit = async (data) => {
    console.log(data)
    //image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    if (res.data.success) {
      //now send the add scholarship item data to the server
      const addReview = {
        ratingPoint: parseFloat(data.ratingPoint),
        reviewDate: data.reviewDate,
        scholarshipName: data.scholarshipName,
        universityName: data.universityName,
        loggedInUserName: data.loggedInUserName,
        reviewComment: data.reviewComment,
        image: res.data.data.display_url,
      }
      //
      const addScholarshipRes = await axiosSecure.patch(`/addReview/${_id}`, addReview)
      console.log(addScholarshipRes.data)
      if (addScholarshipRes.data.modifiedCount > 0) {
        // show success popup
        reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:`${user?.displayName} is added to the Update Review`,
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
    console.log("with image url", res.data)
  }
  return (
    <div>
      <SectionTitle heading={"Update Review"}></SectionTitle>
      <div>
        <div className="mt-5">
          {/* From starting */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex md:flex-row flex-col gap-3">
              <label className="form-control w-full mb-6">
                <div className="label">
                  <span className="label-text">Rating Point</span>
                </div>
                <input
                  {...register("ratingPoint", { required: true })}
                  required
                  defaultValue={ratingPoint}
                  type="number"
                  placeholder="Rating Point"
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full mb-6">
                <div className="label">
                  <span className="label-text">Review date</span>
                </div>
                <input
                  {...register("reviewDate", { required: true })}
                  type="date"
                  defaultValue={reviewDate}
                  placeholder="University Name"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <div className="flex md:flex-row flex-col gap-3">
              <label className="form-control w-full mb-6">
                <div className="label">
                  <span className="label-text">Scholarship Name</span>
                </div>
                <input
                  {...register("scholarshipName", { required: true })}
                  required
                  defaultValue={scholarshipName}
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

            <div className="flex md:flex-row flex-col gap-3">
              <label className="form-control w-full mb-6">
                <div className="label">
                  <span className="label-text">User Email</span>
                </div>
                <input
                  {...register("userEmail", { required: true })}
                  defaultValue={`${user?.email}`}
                  type="text"
                  placeholder="Scholarship Post"
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full mb-6">
                <div className="label">
                  <span className="label-text">Logged In User Name</span>
                </div>
                <input
                  {...register("loggedInUserName", { required: true })}
                  type="text"
                  defaultValue={`${user?.displayName}`}
                  placeholder="Posted User Name"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            {/* Degree and Tuition Fees */}
            <div className="flex md:flex-row flex-col gap-3">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Review comment</span>
                </div>
                <textarea
                  {...register("reviewComment")}
                  defaultValue={reviewComment}
                  className="textarea textarea-bordered h-24 w-full"
                  placeholder="Bio"
                ></textarea>
              </label>
            </div>
            {/* Add University Logo */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Add University Image Or Logo</span>
              </div>
              <input
                type="file"
                {...register("image", { required: true })}
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </label>
            <button className="btn mt-5">
              Update Review <FaRegAddressCard></FaRegAddressCard>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateReview
