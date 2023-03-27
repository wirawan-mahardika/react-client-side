import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { deleteItem } from "../actions/cartSlice";
import { motion } from "framer-motion";

export default function Cart() {
  const items = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let totalPrice = 0;
  items.forEach((item) => {
    const itemPriceTotal = item.price * item.jumlah;
    totalPrice += itemPriceTotal;
  });

  const addCart = (item) => {
    navigate("/cart/detail", { state: item });
  };
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="start"
        animate="end"
        className="flex flex-col gap-y-3"
      >
        <h2 className="font-bold text-3xl uppercase text-gray-800">
          Cart Items
        </h2>
        {items &&
          items.map((item) => {
            const price = item.price * item.jumlah;
            return (
              <motion.div
                variants={childrenVariants}
                key={item.name}
                className="flex justify-between p-5 bg-white "
              >
                <div className="flex gap-x-4 items-center">
                  <img src={item.src} alt="asd" className="w-44" />
                  <div>
                    <h3 className="font-bold text-xl">
                      <span className="text-sky-500">{item.jumlah} x</span>{" "}
                      {item.name}
                    </h3>
                    <div className="flex gap-x-4">
                      <p
                        onClick={() => {
                          dispatch(deleteItem({ name: item.name }));
                        }}
                        className="text-red-600 font-bold mt-3 cursor-pointer"
                      >
                        Hapus
                      </p>
                      <p
                        onClick={() => addCart(item)}
                        className="text-violet-600 font-bold mt-3 cursor-pointer"
                      >
                        Edit
                      </p>
                    </div>
                  </div>
                </div>
                <div className="justify-center items-center flex flex-col">
                  <p className="font-bold text-lg">Price</p>
                  <p>{numberWithCommas(price)}</p>
                </div>
              </motion.div>
            );
          })}

        <motion.div
          variants={childrenVariants}
          className="bg-white flex justify-between w-full self-end p-4"
        >
          <div>
            {items.length ? (
              <>
                <p className="font-bold text-lg">TOTAL PRIZE</p>
                <p className="font-semibold">{numberWithCommas(totalPrice)}</p>
              </>
            ) : (
              <p className="font-bold text-lg">CART EMPTY</p>
            )}
          </div>

          {items.length ? (
            <button className="px-4 py-0.5 bg-emerald-500 rounded-lg font-medium">
              BUY
            </button>
          ) : (
            ""
          )}
        </motion.div>
      </motion.div>
      <Outlet />
    </>
  );
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const containerVariants = {
  start: {
    opacity: 1,
  },
  end: {
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
      staggerChildren: 0.3,
      mass: 10,
      stiffness: 10,
    },
  },
};

const childrenVariants = {
  start: {
    y: -500,
    opacity: 0,
  },
  end: {
    y: 0,
    opacity: 1,
  },
};