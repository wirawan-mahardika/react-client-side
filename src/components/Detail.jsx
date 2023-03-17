import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { addToCart, filterAndAdd } from "../actions/cartSlice";

export default function Detail() {
  const { state } = useLocation();
  const cartItems = useSelector((state) => state.cart);
  const oldItem = cartItems.find((i) => i.name === state.name);
  const dispatch = useDispatch();
  const [jumlah, setJumlah] = useState(oldItem ? oldItem.jumlah : 0);
  const navigate = useNavigate();

  const addCart = (item) => {
    const checkItem = cartItems.find((i) => i.name === item.name);
    console.log(checkItem);
    if (!checkItem) {
      dispatch(
        addToCart({
          name: item.name,
          src: item.src,
          price: item.price,
          jumlah: jumlah,
        })
      );
    } else {
      dispatch(
        filterAndAdd({
          name: checkItem.name,
          src: checkItem.src,
          price: checkItem.price,
          jumlah: jumlah,
        })
      );
    }
  };

  return (
    <>
      <div className="fixed bg-black opacity-60 top-0 left-0 bottom-0 right-0 flex justify-center items-center z-10"></div>
      <div className="bg-gray-200 w-1/3 flex flex-col h-screen left-0 p-6 opacity-100 fixed z-20 top-0 overflow-y-auto">
        <button
          onClick={() => navigate(-1)}
          className="absolute right-0 mr-2 hover:text-red-500 top-0 font-bold text-lg p-1"
        >
          X
        </button>
        <img src={state.src} alt="image1" className="w-full mt-3" />
        <div className="flex flex-col gap-y-3 p-4">
          <p className="font-bold text-3xl text-center">{state.name}</p>
          <div className="flex gap-2 justify-between p-5">
            <div>
              <p className="font-bold text-xl">Price</p>
              <p className="font-medium text-lg">{state.price}</p>

              <p className="font-bold text-xl mt-3">Stock</p>
              <p className="font-medium text-lg">{state.stock}</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="font-bold text-xl text-center">Jumlah Beli</p>
              <div className="flex gap-x-3">
                <button
                  className="rounded px-3 py-0.5 bg-red-500 w-fit font-medium"
                  onClick={() => setJumlah(jumlah - 1)}
                >
                  -
                </button>
                <p>{jumlah}</p>
                <button
                  className="rounded px-3 py-0.5 bg-green-500 w-fit font-medium"
                  onClick={() => setJumlah(jumlah + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => addCart(state)}
                className="px-6 py-1 rounded font-semibold bg-sky-500 w-fit"
              >
                Beli
              </button>
              <NavLink
                to={"/cart"}
                className={"px-6 py-1 rounded font-semibold bg-sky-500 w-fit"}
              >
                Keranjang
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}