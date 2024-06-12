import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaRegAddressCard } from "react-icons/fa";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const ModeratorAddScholarship = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()


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
          const addScholarShipItem = {
            applicationFees: data.applicationFees,
            degreeCategory: data.degreeCategory,
            postedUserEmail: data.postedUserEmail,
            scholarshipCategory: data.scholarshipCategory,
            scholarshipName: data.scholarshipName,
            scholarshipPost: data.scholarshipPost,
            serviceCharge: parseFloat(data.serviceCharge),
            subjectCategory: data.subjectCategory,
            tuitionFees: parseInt(data.tuitionFees),
            universityCity: data.universityCity,
            universityCountry: data.universityCountry,
            universityName: data.universityName,
            universityWorldRank: data.universityWorldRank,
            image: res.data.data.display_url,
          }
          //
          const addScholarshipRes = await axiosSecure.post(
            "/addScholarship",
            addScholarShipItem
          )
          console.log(addScholarshipRes.data)
          if (addScholarshipRes.data.insertedId) {
            // show success popup
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${data.scholarshipName} is added to the AddScholarship`,
              showConfirmButton: false,
              timer: 1500,
            })
          }
        }
        console.log("with image url", res.data)
      }


    return (
        <div>
      <SectionTitle heading={"Add Scholarship"}></SectionTitle>
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
                {...register("scholarshipName", { required: true })}
                required
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
                placeholder="University Name"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* University Country and University City  */}
          <div className="flex md:flex-row flex-col gap-3">
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">University Country</span>
              </div>
              <input
                {...register("universityCountry", { required: true })}
                type="text"
                placeholder="University Country"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">University City</span>
              </div>
              <input
                {...register("universityCity", { required: true })}
                type="text"
                placeholder="University City"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* University World Rank and Application Fees */}
          <div className="flex md:flex-row flex-col gap-3">
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">University World Rank</span>
              </div>
              <input
                {...register("universityWorldRank", { required: true })}
                type="number"
                placeholder="University World Rank"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Application Fees</span>
              </div>
              <input
                {...register("applicationFees", { required: true })}
                type="number"
                placeholder="Application Fees"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* Service charge and Application Deadline */}
          <div className="flex md:flex-row flex-col gap-3">
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Service Charge</span>
              </div>
              <input
                {...register("serviceCharge", { required: true })}
                type="number"
                placeholder="Service Charge"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Application Deadline</span>
              </div>
              <input
                {...register("applicationDate", { required: true })}
                type="date"
                placeholder="Application Deadline"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* Scholarship post Date and Posted User Email*/}
          <div className="flex md:flex-row flex-col gap-3">
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Scholarship Post</span>
              </div>
              <input
                {...register("scholarshipPost", { required: true })}
                type="date"
                placeholder="Scholarship Post"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Posted User Email</span>
              </div>
              <input
                {...register("postedUserEmail", { required: true })}
                type="text"
                placeholder="Posted User Email"
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
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Scholarship Category</span>
              </div>
              <select
                {...register("scholarshipCategory", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="fullFund"> Full fund</option>
                <option value="partial">Partial</option>
                <option value="selfFund">Self-fund</option>
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
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Tuition Fees</span>
              </div>
              <input
                {...register("tuitionFees", { required: true })}
                type="number"
                placeholder="Tuition Fees"
                className="input input-bordered w-full"
              />
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
            Add Scholarship <FaRegAddressCard></FaRegAddressCard>
          </button>
        </form>
      </div>
    </div>
    );
};

export default ModeratorAddScholarship;