import { useForm } from "react-hook-form"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import { FaAd } from "react-icons/fa"

const AddScholarship = () => {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => {
    console.log(data)
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
              {...register('scholarshipName')}
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
              {...register('universityName')}
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
              {...register('universityCountry')}
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
              {...register('universityCity')}
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
              {...register('universityWorldRank')}
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
              {...register('applicationFees')}
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
              {...register('serviceCharge')}
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
              {...register('applicationFees')}
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
              {...register('scholarshipPost')}
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
              {...register('postedUserEmail')}
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
            {...register("subjectCategory")}
            className="select select-bordered w-full"
          >
            <option disabled selected>
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
            {...register("scholarshipCategory")}
            className="select select-bordered w-full"
          >
            <option disabled selected>
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
            {...register("degreeCategory")}
            className="select select-bordered w-full"
          >
            <option disabled selected>
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
              {...register('tuitionFees')}
              type="number"
              placeholder="Tuition Fees"
              className="input input-bordered w-full"
            />
          </label>
          </div>
            {/* Add University Logo */}

          <button className="btn">
            Add Scholarship <FaAd></FaAd>
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddScholarship
