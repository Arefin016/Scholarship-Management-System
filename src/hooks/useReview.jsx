import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useReview = () => {

  const axiosPublic = useAxiosPublic();

  const {data: addReview = [], isPending: loading, refetch} = useQuery({
    queryKey: ['addReview'],
    queryFn: async() => {
      const res = await axiosPublic.get('/addReview')
      return res.data;
    }
  })

  // const [review, setReview] = useState();
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   fetch("https://scholarship-management-system-server-chi.vercel.app/addReview")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setReview(data)
  //       setLoading(false)
  //     })
  // }, [])
  return [addReview, loading, refetch]
}

export default useReview
