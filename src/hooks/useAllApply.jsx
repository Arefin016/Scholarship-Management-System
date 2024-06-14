// import { useEffect, useState } from "react"
import useAxiosPublic from "./useAxiosPublic"
import { useQuery } from "@tanstack/react-query"

const useAllApply = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: submits = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["submits"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/submits`)
      return res.data
    },
  })
  // const [applies, setApplies, refetch] = useState([])
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   fetch("http://localhost:5000/submits")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setApplies(data)
  //       setLoading(false)
  //     })
  // }, [])

  return [submits, loading, refetch]
}

export default useAllApply
