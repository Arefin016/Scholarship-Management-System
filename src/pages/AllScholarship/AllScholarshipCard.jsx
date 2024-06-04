import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"

const AllScholarshipCard = ({ scholars }) => {
  const {
    universityName,
    universityImage,
    scholarshipCategory,
    applicationDeadline,
    subjectCategory,
    applicationFees,
    universityLocation,
    _id,
    rating,
  } = scholars
  return (
    <div className="card card-side bg-base-100 shadow-xl flex lg:flex-row flex-col">
      <Helmet>
        <title>Scholar || AllScholarship</title>
      </Helmet>
      <figure>
        <img src={universityImage} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl">{universityName}</h2>
        <p className="font-medium">Scholarship Cate: {scholarshipCategory}</p>
        <p className="font-medium">
          Application Deadline: {applicationDeadline}
        </p>
        <p className="font-medium">Subject Cate: {subjectCategory}</p>

        <p className="font-medium">Address: {universityLocation.country}</p>
        <p className="font-medium">City: {universityLocation.city}</p>
        <div className="flex md:flex-row flex-col font-medium">
          <p>Fees: ${applicationFees}</p>
          <p>Rating: {rating}</p>
        </div>
        <div className="mt-4">
          <Link to={`/AllScholarship/${_id}`}>
            <button className="btn btn-success text-white">
              Scholarship Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AllScholarshipCard
