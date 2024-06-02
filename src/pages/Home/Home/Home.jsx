import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import ReviewSection from "../ReviewSection/ReviewSection";
import TopScholarship from "../TopScholarship/TopScholarship";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Scholar || Home</title>
            </Helmet>
            <Banner></Banner>
            <TopScholarship></TopScholarship>
            <ReviewSection></ReviewSection>
        </div>
    );
};

export default Home;