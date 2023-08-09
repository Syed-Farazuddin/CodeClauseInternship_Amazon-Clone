import React from "react";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // Dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div
      className="flex m-3 flex-col items-center justify-end max-h-[400px] min-w-[100px] p-[20px] w-full z-10 bg-white
    "
    >
      <div className="h-[100px] mb-[15px] " key={id}>
        <p>{title}</p>
        <p className="mt-[5px]">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <div className="">
        <img
          className="m-auto max-h-[200px] w-full object-contain my-[10px]"
          src={image}
          alt=""
        />
      </div>
      <button
        className="bg-[#f0c14b] border text-[#111] p-1 mt-[10px] font-bold max-w-fit mx-auto"
        onClick={addToBasket}
      >
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
