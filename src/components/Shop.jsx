import { Form, Outlet, useActionData } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getme } from "../actions/authSlice";
import { axiosJwtPost } from "../axiosJwt/axios";
import { motion } from "framer-motion";
import { addedToCart } from "../actions/shopSlice";

export default function Shop() {
  const { isError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const data = useActionData();
  const shop = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(getme());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const addCart = (item) => {
    dispatch(addedToCart(data));
    navigate("/shop/detail", { state: item });
  };

  return (
    <>
      <div className="mb-3">
        <Form method="post" className="flex flex-col gap-y-2">
          <label className="font-bold text-2xl underline underline-offset-8">
            SEARCH PRODUCT HERE
          </label>
          <input
            className="px-3 py-0.5 outline-none w-1/4 border-2 border-indigo-500 rounded-lg h-9 mt-2 focus:border-sky-500"
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Search products name here . . ."}
          />
          <button
            type="submit"
            className="font-medium px-4 py-0.5 rounded-lg w-fit bg-cyan-600"
          >
            SEND
          </button>
        </Form>
      </div>
      <motion.div
        variants={containerVariants}
        initial="start"
        animate="end"
        className="grid grid-cols-3 gap-3 gap-y-2"
      >
        {data
          ? data.map((item) => {
              return (
                <motion.div
                  variants={childrenVariants}
                  key={item.id}
                  className="text-center flex flex-col"
                >
                  <img src={item.src} alt={item.id} />
                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="text-red-500">{item.price}</p>
                  <button
                    onClick={() => {
                      addCart(item);
                    }}
                    className="px-4 py-0.5 bg-sky-500 rounded w-fit font-semibold mx-auto"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              );
            })
          : shop.map((item) => {
              return (
                <motion.div
                  variants={childrenVariants}
                  key={item.id}
                  className="text-center flex flex-col"
                >
                  <img src={item.src} alt={item.id} />
                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="text-red-500">{item.price}</p>
                  <button
                    onClick={() => {
                      addCart(item);
                    }}
                    className="px-4 py-0.5 bg-sky-500 rounded w-fit font-semibold mx-auto"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              );
            })}
      </motion.div>
      <Outlet />
    </>
  );
}

export const shopSearchAction = async ({ request }) => {
  const formData = await request.formData();
  const search = formData.get("search");
  const data = await axiosJwtPost("search", search);
  return data;
};

const childrenVariants = {
  start: {
    opacity: 0,
    x: -200,
  },
  end: {
    opacity: 1,
    x: 0,
  },
};

const containerVariants = {
  start: {
    opacity: 1,
  },
  end: {
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.2,
    },
  },
};
