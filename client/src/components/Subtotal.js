import React from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";
import { getBasketTotal } from "./reducer";

function Subtotal() {
  const Navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal flex flex-col justify-between w-[300px] h-[100px] p-[10px] bg-[white] border-[#dddddd] rounded-[3px]">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift flex items-center">
              <input type="checkbox" className="mr-[5px]" /> This order contains
              a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button
        onClick={(e) => {
          Navigate("/payment");
        }}
        className="bg-[#f0c14b] h-[30px] w-full border mt-[10px] text-[#111] my-auto mx-auto mb-2 rounded-[2px] "
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
