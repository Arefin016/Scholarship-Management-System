import { useEffect, useState } from "react"

const useAllApply = () => {
  const [applies, setApplies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:5000/submits")
      .then((res) => res.json())
      .then((data) => {
        setApplies(data)
        setLoading(false)
      })
  }, [])

  return [applies, loading]
}

export default useAllApply
