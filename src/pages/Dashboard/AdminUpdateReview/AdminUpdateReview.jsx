// import { useForm } from "react-hook-form";
// import { useLoaderData } from "react-router-dom";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAuth from "../../../hooks/useAuth";
// import Swal from "sweetalert2";

// // const AdminUpdateReview = () => {
// //     const {ratingPoint, reviewDate, scholarshipName, universityName, reviewComment, _id} = useLoaderData()

// //     const { register, handleSubmit, reset } = useForm()
// //   const axiosPublic = useAxiosPublic()
// //   const axiosSecure = useAxiosSecure()
// //   const { user } = useAuth()

// //   const onSubmit = async (data) => {
// //     console.log(data)
// //     //image upload to imgbb and then get an url
// //     const imageFile = { image: data.image[0] }
// //     const res = await axiosPublic.post(image_hosting_api, imageFile, {
// //       headers: {
// //         "content-type": "multipart/form-data",
// //       },
// //     })
// //     if (res.data.success) {
// //       //now send the add scholarship item data to the server
// //       const addReview = {
// //         ratingPoint: parseFloat(data.ratingPoint),
// //         reviewDate: data.reviewDate,
// //         scholarshipName: data.scholarshipName,
// //         universityName: data.universityName,
// //         loggedInUserName: data.loggedInUserName,
// //         reviewComment: data.reviewComment,
// //         image: res.data.data.display_url,
// //       }
// //       //
// //       const addScholarshipRes = await axiosSecure.patch(`/addReview/${_id}`, addReview)
// //       console.log(addScholarshipRes.data)
// //       if (addScholarshipRes.data.modifiedCount > 0) {
// //         // show success popup
// //         reset()
// //         Swal.fire({
// //           position: "top-end",
// //           icon: "success",
// //           title:`${user?.displayName} is added to the Update Review`,
// //           showConfirmButton: false,
// //           timer: 1500,
// //         })
// //       }
// //     }
// //     console.log("with image url", res.data)
// //   }
// //     return (
// //         <div>
// //            <h2>This is Shah Arefin Ahmed</h2> 
// //         </div>
// //     );
// // };

// export default AdminUpdateReview;