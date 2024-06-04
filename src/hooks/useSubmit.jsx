// useCart = useSubmit
//api, axios (axios secure), tan stack

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useSubmit = () => {
    // tan stack query
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {refetch, data: submit=[]} = useQuery({
        // cart = apply
        queryKey: ['apply', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submits?email=${user.email}`)
            return res.data;
        }
    })
    return [submit, refetch]
};

export default useSubmit;