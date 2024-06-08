import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import banner from "../../../assets/partnerships/p5.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import slide1 from "../../../assets/partnerships/p1.jpg"
import slide2 from "../../../assets/partnerships/p2.jpg"
import slide3 from "../../../assets/partnerships/p3.jpg"
import slide4 from "../../../assets/partnerships/p4.jpg"

const OurPartnerships = () => {
  return (
    <div>
      <SectionTitle heading={"Our Partnerships"}></SectionTitle>

      <div className="">
        {/* <div className="hero my-5">
          <div className="hero-content flex-col lg:gap-32 lg:flex-row-reverse">
            <img
              src={banner}
              className="rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold">Microsoft!</h1>
              <p className="py-6">
              Our partnership with Honeywell is across turnkey implementations in smart city <br /> projects.
              </p>
              <button className="btn btn-outline">Explore More</button>
            </div>
          </div>
        </div> */}
        <div>
        <h2 className="text-2xl mb-2">More Partnerships</h2>
        <button className="btn btn-outline">Explore More</button>
        <div className="divider"></div> 
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper mb-4">
        <SwiperSlide>
            <img src={slide1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide4} alt="" />
        </SwiperSlide>
      </Swiper>
      </div>
      </div>
      
    </div>
  )
}

export default OurPartnerships
