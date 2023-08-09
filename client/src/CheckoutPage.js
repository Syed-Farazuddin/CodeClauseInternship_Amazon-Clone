import React from "react";
import Subtotal from "./components/Subtotal";
import BasketItems from "./components/BasketItems";
import { useStateValue } from "./components/StateProvider";

function CheckoutPage() {
  const [{ basket, user }, dispatch] = useStateValue();
  const userName = user?.email.split("@");
  return (
    <div className="flex p-3 bg-[rgba(234, 237, 237)] h-max max-w-[1200px] mx-auto">
      <div className="left bg-white mr-2">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          className="checkout_add w-full mb-[10px]"
          alt=""
        />
        <div className="info">
          {user ? (
            <h3 className="font-semibold p-[10px] mr-[10px]">
              Hello, {userName[0]}
            </h3>
          ) : (
            ""
          )}
          <h2 className="font-bold mr-[10px] mt-[0px] border-b p-[10px] ">
            {basket ? "Your Shopping Cart" : "Your shopping cart is empty"}
          </h2>
          <div className="flex flex-col">
            {basket.map((item) => (
              <BasketItems
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="right">
        <h2>
          <Subtotal />
        </h2>
      </div>
    </div>
  );
}

export default CheckoutPage;
