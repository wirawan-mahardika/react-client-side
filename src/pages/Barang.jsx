import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { axiosJwtPost } from "../axiosJwt/axios";

export default function Barang() {
  const data = useActionData();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) {
      if (user.role !== "admin") {
        return navigate("/home");
      }
    }
  }, [user, navigate]);

  return (
    <>
      <Form method="post" className="p-5 flex flex-col gap-y-3">
        <h2 className="font-bold text-3xl ">Tambah Barang</h2>
        {msg && (
          <p className="bg-green-400 rounded text-gray-900 w-2/5 px-2 py-0.5 text-center">
            {msg}
          </p>
        )}
        <div className="flex flex-col gap-y-1">
          <label className="font-semibold">Nama Barang</label>
          <input
            type="text"
            name="name"
            className="w-2/5 px-2 py-0.5 rounded outline-none border-2 border-amber-700 focus:border-sky-600"
            placeholder="Item name . . . "
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="font-semibold">Source Image</label>
          <input
            type="url"
            name="src"
            className="w-2/5 px-2 py-0.5 rounded outline-none border-2 border-amber-700 focus:border-sky-600"
            placeholder="Source image . . . "
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="font-semibold">Stock</label>
          <input
            type="number"
            name="stock"
            className="w-2/5 px-2 py-0.5 rounded outline-none border-2 border-amber-700 focus:border-sky-600"
            placeholder="Stock . . . "
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="font-semibold">Price</label>
          <input
            type="number"
            name="price"
            className="w-2/5 px-2 py-0.5 rounded outline-none border-2 border-amber-700 focus:border-sky-600"
            placeholder="Price . . . "
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="font-semibold">Brand</label>
          <input
            type="text"
            name="brand"
            className="w-2/5 px-2 py-0.5 rounded outline-none border-2 border-amber-700 focus:border-sky-600"
            placeholder="Brand . . . "
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <h4 className="font-semibold">Category</h4>
          <div>
            <input type="radio" id="laptop" value={"laptop"} name="category" />
            <label htmlFor="laptop"> Laptop</label>
          </div>
          <div>
            <input
              type="radio"
              id="handphone"
              value={"handphone"}
              name="category"
            />
            <label htmlFor="handphone"> Handphone</label>
          </div>
        </div>
        <button
          onClick={() => {
            setMsg("Berhasil ditambahkan");
          }}
          className="rounded bg-sky-500 font-medium px-3 p-0.5 w-fit"
        >
          Simpan
        </button>
      </Form>
    </>
  );
}

export const barangActionData = async ({ request }) => {
  const FormData = await request.formData();
  const data = Object.fromEntries(FormData);

  const axiosJwt = axios.create();
  const token = localStorage.getItem("token");
  const { exp } = jwtDecode(token);

  axiosJwt.interceptors.request.use(
    async (req) => {
      const now = Date.now().valueOf();
      if (now > exp * 1000) {
        const response = await axios.get(
          "http://localhost:1000/api/user/refreshToken",
          { withCredentials: true }
        );
        localStorage.setItem("token", response.data.token);
        req.headers.Authorization = "Bearer " + response.data.token;
      }
      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  try {
    const response = await axiosJwt.post(
      "http://localhost:1000/api/resources/addItem",
      {
        ...data,
      },
      { headers: { Authorization: "Bearer " + token } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
