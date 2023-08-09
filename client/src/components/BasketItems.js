import React from "react";
import { useStateValue } from "./StateProvider";

function BasketItems({ id, image, title, price, rating }) {
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  const [{ basket }, dispatch] = useStateValue();
  console.log(basket);
  return (
    <div className="flex p-3 border-b-2">
      <img
        src={image}
        className="w-[180px] mr-3 h-[180px] object-contain my-[10px]"
        alt="item_img"
      />
      <div className="w-[200px] h-auto p-2 flex flex-col ">
        <p className="text-lg font-bold">{title}</p>
        <p className="">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="flex ">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        <button
          className="bg-[#f0c14b] border text-[#111] font-bold "
          onClick={removeFromBasket}
        >
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default BasketItems;
