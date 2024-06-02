import { useEffect, useState } from "react"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import ScholarshipCard from "../../Shared/ScholarshipCard/ScholarshipCard"
import { Link } from "react-router-dom"

const TopScholarship = () => {

  const [topScholarship, setTopScholarship] = useState([])

  useEffect( () => {
    fetch('topscholarship.json')
    .then(res => res.json())
    .then(data  => setTopScholarship(data))
  }, [])


  return (
    <section>
      <SectionTitle heading={"Top Scholarship"}>
      </SectionTitle>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 my-5">
        {
          topScholarship.map(scho => <ScholarshipCard
          scho={scho}
          key={scho._id}
          ></ScholarshipCard>)
        }
      </div>
       <div className="md:flex items-center justify-center">
       <Link to="/AllScholarship">
       <button className="btn btn-outline bg-purple-500 border-0 border-b-4 my-3 text-center">All Scholarship</button>
       </Link>
       </div>
    </section>
  )
}

export default TopScholarship
