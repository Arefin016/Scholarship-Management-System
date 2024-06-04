import { Link } from "react-router-dom"

const ScholarshipCard = ({ scho }) => {
  const {
    universityName,
    universityImage,
    scholarshipCategory,
    applicationDeadline,
    subjectCategory,
    applicationFees,
    universityLocation,
    rating,
  } = scho
  return (
    <div className="card card-side bg-slate-200 shadow-xl flex md:flex-col flex-col">
      <div>
        <figure>
          <img src={universityImage} alt="" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{universityName}</h2>
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
            <Link to="/AllScholarship">
              <button className="btn btn-success text-white">
                Scholarship Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScholarshipCard
