import { FaRegAddressCard } from "react-icons/fa"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import Swal from "sweetalert2"
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../hooks/useAxiosPublic"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
// import useSubmit from "../../../hooks/useSubmit";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const PaymentUserInformation = () => {
  const { register, handleSubmit, reset } = useForm()
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  // const [submit, refetch] = useSubmit();
  // console.log(submit);
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
        applicantPhoneNumber: data.applicantPhoneNumber,
        applicantAddress: data.applicantAddress,
        degreeCategory: data.degreeCategory,
        scholarshipCategory: data.scholarshipCategory,
        sscResult: parseFloat(data.sscResult),
        hscResult: parseFloat(data.hscResult),
        universityName: data.universityName,
        subjectCategory: data.subjectCategory,
        image: res.data.data.display_url,
      }
      //
      const addScholarshipRes = await axiosSecure.post(
        "/paymentUserInformation",
        addScholarShipItem
      )
      console.log(addScholarshipRes.data)
      if (addScholarshipRes.data.insertedId) {
        // show success popup
        reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.applicantPhoneNumber} is added to the AddScholarship`,
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
    console.log("with image url", res.data)
  }

  return (
    <div>
      <SectionTitle heading={"Payment User Information"}></SectionTitle>
      <div className="mt-5">
        {/* From starting */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*Applicant Phone Number and Applicant address  */}
          <div className="flex md:flex-row flex-col gap-3">
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Applicant phone number</span>
              </div>
              <input
                {...register("applicantPhoneNumber", { required: true })}
                required
                type="number"
                placeholder="Applicant phone number"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Applicant address</span>
              </div>
              <select
                {...register("applicantAddress", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="agriculture">Village</option>
                <option value="engineering">District</option>
                <option value="doctor">Country</option>
              </select>
            </label>
          </div>

          {/* Applicant gender and Applicant Applying Degree  */}
          <div className="flex md:flex-row flex-col gap-3">
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Applicant gender</span>
              </div>
              <select
                {...register("applicantGender", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a Gender
                </option>
                <option value="agriculture">Male</option>
                <option value="engineering">Female</option>
              </select>
            </label>
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

          {/* SSC Result and HSC Result */}
          <div className="flex md:flex-row flex-col gap-3">
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">SSC Result</span>
              </div>
              <input
                {...register("sscResult", { required: true })}
                type="number"
                placeholder="SSC Result"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">HSC Result</span>
              </div>
              <input
                {...register("hscResult", { required: true })}
                type="number"
                placeholder="HSC Result"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* University name and Scholarship category */}
          <div className="flex md:flex-row flex-col gap-3">
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">University name</span>
              </div>
              <input
                {...register("universityName", { required: true })}
                type="text"
                // defaultValue={submit?.universityName}
                placeholder="University name"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Scholarship category</span>
              </div>
              <input
                {...register("scholarshipCategory", { required: true })}
                type="text"
                placeholder="Application Deadline"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          {/* Add Application Photo */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Application Photo</span>
            </div>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </label>
          <button className="btn mt-5">
            Submit <FaRegAddressCard></FaRegAddressCard>
          </button>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          {/* <button
            className="btn"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            open modal
          </button> */}
          {/* <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  {/* <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog> */} 
        </form>
      </div>
    </div>
  )
}

export default PaymentUserInformation
