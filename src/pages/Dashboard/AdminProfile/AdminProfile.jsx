import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { FaDollarSign, FaJediOrder, FaUsers } from "react-icons/fa"


import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const AdminProfile = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats")
      return res.data
    },
  })

  const {data: chartData = []} = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/order-stats');
      return res.data;
    }
  })

  // custom shape for the bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  

  // console.log(user)
  return (
    <div>
      <h2>Hi {user?.displayName}</h2>
      <div className="card w-96  mt-5 bg-base-100 shadow-xl">
        <figure>
          <img src={user?.photoURL} alt="image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Name: {user?.displayName}</h2>
          <p>Email: {user?.email}</p>
        </div>
      </div>
      <div className="stats shadow mt-10">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-5xl"></FaDollarSign>
          </div>
          <div className="stat-title">Profits</div>
          <div className="stat-value">${stats?.profits}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-5xl"></FaUsers>
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value">{stats?.users}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaJediOrder className="text-5xl"></FaJediOrder>
          </div>
          <div className="stat-title">Applied Scholarship</div>
          <div className="stat-value">{stats?.appliedScholarship}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col">
        <div className="w-1/2">
        <BarChart
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
        </div>
        <div className="w-1/2">

        </div>
      </div>
    </div>
  )
}

export default AdminProfile
