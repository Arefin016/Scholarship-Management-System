// import { useEffect, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useApply = () => {
  const axiosPublic = useAxiosPublic()

  //   const [apply, setApply] = useState([])
  //   const [loading, setLoading] = useState(true)

  //   useEffect(() => {
  //     fetch("https://scholarship-management-system-server-chi.vercel.app/topScholarship")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setApply(data)
  //         setLoading(false)
  //       })
  //   }, [])

  const {
    data: apply = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["apply"],
    queryFn: async () => {
      const res = await axiosPublic.get("/topScholarship")
      return res.data
    },
  })

  return [apply, loading, refetch]
}

export default useApply
