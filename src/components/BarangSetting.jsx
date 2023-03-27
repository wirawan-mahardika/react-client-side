import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { axiosJwtGet } from "../axiosJwt/axios";

export default function BarangSetting() {
  const loader = useLoaderData();
  const [data, setData] = useState(loader);

  const handleHapus = async (id) => {
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
      const response = await axiosJwt.delete(
        "http://localhost:1000/api/resources/delete-item/" + id,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      const newItem = data.filter((i) => {
        return i.id !== id;
      });
      setData(newItem);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <>
      <h2 className="font-bold text-3xl uppercase">Items Setting</h2>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-center text-sm font-light">
                <thead class="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                  <tr>
                    <th scope="col" class=" px-6 py-4">
                      No
                    </th>
                    <th scope="col" class=" px-6 py-4">
                      Nama
                    </th>
                    <th scope="col" class=" px-6 py-4">
                      Brand
                    </th>
                    <th scope="col" class=" px-6 py-4">
                      Category
                    </th>
                    <th scope="col" class=" px-6 py-4">
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, i) => {
                      return (
                        <tr
                          key={i}
                          class="border-b dark:border-neutral-500 font-medium"
                        >
                          <td class="whitespace-nowrap  px-6 py-4">{i + 1}</td>
                          <td class="whitespace-nowrap  px-6 py-4">
                            {item.name}
                          </td>
                          <td class="whitespace-nowrap  px-6 py-4">
                            {item.brand}
                          </td>
                          <td class="whitespace-nowrap  px-6 py-4">
                            {item.category}
                          </td>
                          <td class="whitespace-nowrap  px-6 py-4">
                            <button
                              onClick={() => handleHapus(item.id)}
                              className="px-5 py-1 rounded-md bg-red-500"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const BarangLoaderData = () => {
  const data = axiosJwtGet("all-item");
  return data;
};
