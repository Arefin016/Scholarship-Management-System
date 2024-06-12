import SectionTitle from "../../../components/SectionTitle/SectionTitle"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import { useEffect, useState } from "react"
import { Rating } from "@smastrom/react-rating"
import '@smastrom/react-rating/style.css'

const ReviewSection = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/addReview")
      .then((res) => res.json())
      .then((data) => setReviews(data))
  }, [])

  return (
    <section className="my-20">
      <SectionTitle heading="Student Review Section"></SectionTitle>
      {reviews.length}
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="m-24">
              <Rating style={{ maxWidth: 180 }} value={review.ratingPoint} readOnly />
              <h3 className="text-2xl text-orange-400">
                Reviewer name: {review.loggedInUserName}
              </h3>
              <h3>Review date: {review.reviewDate}</h3>
              <h3>Reviewer Comments: {review.reviewComment}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default ReviewSection
