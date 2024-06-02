const ScholarshipCard = ({ scho }) => {
  const {
    universityName,
    universityImage,
    scholarshipCategory,
    applicationDeadline,
    subjectCategory,
    applicationFees,
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
          <div className="flex md:flex-row flex-col font-medium">
            <p>Fees: ${applicationFees}</p>
            <p>Rating: {rating}</p>
          </div>
          <div className="mt-4">
            <button className="btn btn-success text-white">
              Scholarship Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScholarshipCard
