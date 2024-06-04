import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import AllScholarshipCard from "./AllScholarshipCard"

const AllScholarship = () => {
  const [scholarship, setScholarship] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/topScholarship")
      .then((res) => res.json())
      .then((data) => setScholarship(data))
  }, [])

  return (
    <section>
      <Helmet>
        <title>Scholar || All Scholarship</title>
      </Helmet>
      <div className="text-center lg:pt-20 mt-5">
        <input
          className="border border-black p-2"
          type="Search"
          placeholder="Search"
        />
      </div>
      <div className="space-y-4 my-5">
        {scholarship.map((scholars) => (
          <AllScholarshipCard
            key={scholars._id}
            scholars={scholars}
          ></AllScholarshipCard>
        ))}
      </div>
    </section>
  )
}

export default AllScholarship
