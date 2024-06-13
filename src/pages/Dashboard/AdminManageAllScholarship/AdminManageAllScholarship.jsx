import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import useAllApply from "../../../hooks/useAllApply"

const AdminManageAllScholarship = () => {
  const [applies] = useAllApply()
  return (
    <div>
      <SectionTitle heading={"Manage Applied Scholarship"}></SectionTitle>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>University Name</th>
                <th>Scholarship Name</th>
                <th>Subject Category</th>
                <th>Applied Degree</th>
                <th>Application Fees</th>
                <th>Application Fees</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applies.map((apply, index) => (
                <tr key={apply._id}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {apply.universityName}
                  </td>
                  <td>
                    {apply.scholarshipCategory}
                  </td>
                  <td>
                    {apply.subjectCategory}
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminManageAllScholarship
