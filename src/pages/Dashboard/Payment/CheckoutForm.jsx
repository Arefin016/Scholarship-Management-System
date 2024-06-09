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
  const [clientSecret , setClientSecret] = useState('');
  const stripe = useStripe()
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const[submit] = useSubmit();
  const totalApplicationFees = submit.reduce( (total, item) => total + item.applicationFees, 0)


  useEffect( () => {
     axiosSecure.post('/create-payment-intent', {price: totalApplicationFees})
     .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
     })
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
      setError('');
    }

    //confirm payment 
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card:  card,
        billing_details: {
           email: user?.email || 'anonymous',
           name: user?.displayName || "anonymous"
        }
      }
    })
    if(confirmError){
      console.log('confirm error')
    }
    else{
      console.log('payment intent',paymentIntent)
      if(paymentIntent.status === "succeeded"){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Payment Successfully",
          showConfirmButton: false,
          timer: 1500
        });
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
      <div className="toast toast-center toast-middle">
        <div className="alert alert-info">
          <span>{error}</span>
        </div>
      </div>
    </form>
  )
}

export default CheckoutForm
