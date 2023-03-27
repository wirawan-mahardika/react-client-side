import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { getme } from "../actions/authSlice";
import { axiosJwtGet } from "../axiosJwt/axios";
import { motion } from "framer-motion";

export default function Handphone() {
  const { isError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useLoaderData();

  useEffect(() => {
    dispatch(getme());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const addCart = (item) => {
    navigate("/handphone/detail", { state: item });
  };
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="start"
        animate="end"
        className="grid grid-cols-3 gap-3 gap-y-2"
      >
        {data &&
          data.map((item) => {
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
                  onClick={() => addCart(item)}
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

export const handphoneLoader = () => {
  const data = axiosJwtGet("handphone");
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