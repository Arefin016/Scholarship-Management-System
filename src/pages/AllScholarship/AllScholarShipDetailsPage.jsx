import { Helmet } from "react-helmet-async"
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllScholarShipDetailsPage = () => {
  const scholarShipDetails = useLoaderData();
  const {user} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleAddSubmit = submit => {
    if(user && user.email){
      // TODO: send submit item to the database
      console.log(user.email, submit);
      const submitItem = {
        applyId: _id,
        email: user.email,
        universityName,
        applicationFees,
        universityImage
      }
      axiosSecure.post('/submits', submitItem)
      .then(res => {
        console.log(res.data)
        if(res.data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${universityName} scholarship added`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }
    else{
      Swal.fire({
        title: "Ypu are not Logged in",
        text: "Please login to add to the submit",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login"
      }).then((result) => {
        if (result.isConfirmed) {
          //send the user to the login page 
          navigate('/login', {state: {from: location}})
        }
      });
    }
  }
  const {
    universityName,
    universityImage,
    scholarshipCategory,
    applicationDeadline,
    subjectCategory,
    applicationFees,
    scholarshipDescription,
    _id,
    universityLocation,
  } = scholarShipDetails
  return (
    <div className="card lg:pt-32 pt-20 card-side bg-base-100 shadow-xl flex lg:flex-row flex-col mb-5">
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
          <button
          onClick={() => handleAddSubmit(scholarShipDetails)}
          className="btn btn-success text-white">
            Apply Scholarship
          </button>
          <Link to="/AllScholarShip">
          <button className="btn btn-primary ml-4">Back To All Scholarship</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AllScholarShipDetailsPage
