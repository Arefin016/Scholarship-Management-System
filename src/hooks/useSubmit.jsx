// useCart = useSubmit

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useSubmit = () => {
    // tan stack query
    const axiosSecure = useAxiosSecure();
    const {data: submit=[]} = useQuery({
        // cart = apply
        queryKey: ['apply'],
        queryFn: async () => {
            const res = await axiosSecure.get('/submits')
            return res.data;
        }
    })
    return [submit]
};

export default useSubmit;