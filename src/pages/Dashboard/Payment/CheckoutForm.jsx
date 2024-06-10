import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import useSubmit from "../../../hooks/useSubmit"
import useAuth from "../../../hooks/useAuth"
import Swal from "sweetalert2"
import { useLocation, useNavigate } from "react-router-dom"

const CheckoutForm = () => {
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const [transactionId, setTransactionId] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const stripe = useStripe()
  const elements = useElements()
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const [submit, refetch] = useSubmit()
  const totalApplicationFees = submit.reduce(
    (total, item) => total + parseInt(item.applicationFees),
    0
  )

  useEffect(() => {
    if (totalApplicationFees > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalApplicationFees })
        .then((res) => {
          console.log(res.data.clientSecret)
          setClientSecret(res.data.clientSecret)
        })
    }
  }, [axiosSecure, totalApplicationFees])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)

    if (card === null) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    })
    if (error) {
      console.log("payment error", error)
      setError(error.message)
    } else {
      console.log("payment method", paymentMethod)
      setError("")
    }

    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      })
    if (confirmError) {
      console.log("confirm error")
    } else {
      console.log("payment intent", paymentIntent)
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id)
        setTransactionId(paymentIntent.id)

        // now the save the payment
        const payment = {
          email: user.email,
          price: totalApplicationFees,
          transactionId: paymentIntent.id,
          date: new Date(),
          submitIds: submit.map((item) => item._id),
          applyIds: submit.map((item) => item.applyId),
          status: "pending",
        }
        const res = await axiosSecure.post("/payments", payment)
        // console.log("payment saved", res.data);
        refetch();

        if(res.data?.paymentResult?.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Successfully",
            showConfirmButton: false,
            timer: 1500,
          })
        }
        //
        navigate('/', {state: {from: location}})
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary mt-3"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      {error && <p className="text-red-600">The error is : {error}</p>}
      {transactionId && (
        <p className="text-green-600">Your transaction id: {transactionId}</p>
      )}
    </form>
  )
}

export default CheckoutForm
