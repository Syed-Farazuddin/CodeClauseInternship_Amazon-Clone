import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import BasketItems from "./BasketItems";
import Subtotal from "./Subtotal";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const [{ basket, user }, dispatch] = useStateValue();
  const userName = user?.email.split("@");
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("The Secret is ", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        console.log(paymentIntent);
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        navigate("/orders");
      });
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment bg-white ">
      <div className="">
        <h1 className="font-bold text-3xl p-[10px] text-center bg-[rgba(234,237,237)]  border-b border-b-gray-300">
          Checkout
        </h1>
        <div className="adress flex gap-5 p-[20px] mx-[20px] border-b border-b-gray-300">
          <div className="flex-[0.2]">
            <h3 className="font-bold">Delivery Address</h3>
          </div>
          <div className="flex-[0.8]">
            <p>{userName?.[0]}</p>
            <p>Hyderabad, Telangana</p>
            <p>12-89/4</p>
          </div>
        </div>
        <div className="items flex p-[20px] gap-5 mx-[20px] border-b border-b-gray-300">
          <div className="flex-[0.2]">
            <h3 className="font-bold">Review items and delivery</h3>
          </div>
          <div className="flex-[0.8]">
            {basket.map((item) => (
              <BasketItems
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="payment_method flex gap-5 p-[20px] mx-[20px] border-b-gray-300">
        <div className="flex-[0.2]">
          <h3 className=" text-center">Payment Method</h3>
        </div>
        <div className="flex-[0.8]">
          {/* Using Stripes */}
          <form action="" onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <div className="mt-4 border p-2 ">
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <h3>
                      Order Total : <strong>{value}</strong>
                    </h3>
                  </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)} // Part of the homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              <button
                className="cursor-pointer p-2 border bg-gray-200 font-semibold mt-2"
                disabled={processing || disabled || succeeded}
              >
                <span>{processing ? <p>Processing</p> : "Buy now"}</span>
              </button>
            </div>
            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
