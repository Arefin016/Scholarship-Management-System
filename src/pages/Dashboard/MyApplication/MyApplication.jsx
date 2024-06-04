import useSubmit from "../../../hooks/useSubmit"

const MyApplication = () => {
  //cart =submit
  const [submit] = useSubmit()
  const totalApplicationFees = submit.reduce(
    (total, item) => total + item.applicationFees,
    0
  )
  return (
    <div>
      <div className="flex lg:justify-evenly flex-col lg:flex-row">
        <h2 className="text-4xl">Items: {submit.length}</h2>
        <h2 className="text-4xl">Total Price: {totalApplicationFees}</h2>
        <button className="btn btn-success">Apply Scholarship</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>University Name</th>
              <th>Address</th>
              <th>Subject</th>
              <th>Application Fees</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submit.map((item, index) => (
              <tr key={item._id}>
                <th>
                  {index + 1}
                </th>
                <td>
                    {item.universityName}
                </td>
                <td>
                   {item.universityLocation.country}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                  City: {item.universityLocation.city}
                  </span>
                </td>
                <td>{item.subjectCategory}</td>
                <td>${item.applicationFees}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">Add Review</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyApplication
