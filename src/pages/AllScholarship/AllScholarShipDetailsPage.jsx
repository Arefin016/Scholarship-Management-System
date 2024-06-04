import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";

const AllScholarShipDetailsPage = () => {
    const scholarShipDetails = useLoaderData();
    const {universityName,
        universityImage,
        scholarshipCategory,
        applicationDeadline,
        subjectCategory,
        applicationFees,
        scholarshipDescription,
        _id,
        universityLocation} = scholarShipDetails;
    return (
        <div className="card card-side bg-base-100 shadow-xl flex lg:flex-row flex-col lg:pt-10 mb-5">
        <Helmet>
          <title>Scholar || {_id}</title>
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
            <p className="font-medium">Fees: ${applicationFees}</p>
            <p className="font-medium">Desc: {scholarshipDescription}</p>
          <div className="mt-4">
            
              <button className="btn btn-success text-white">
              Apply Scholarship
              </button>
            
          </div>
        </div>
      </div>
    );
};

export default AllScholarShipDetailsPage;