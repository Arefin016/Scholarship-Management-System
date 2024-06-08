import { Helmet } from "react-helmet-async"
import Banner from "../Banner/Banner"
import ReviewSection from "../ReviewSection/ReviewSection"
import TopScholarship from "../TopScholarship/TopScholarship"
import OurPartnerships from "../OurPartnerships/OurPartnerships"

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Scholar || Home</title>
      </Helmet>
      <Banner></Banner>
      <TopScholarship></TopScholarship>
      <ReviewSection></ReviewSection>
      <OurPartnerships></OurPartnerships>
    </div>
  )
}

export default Home
