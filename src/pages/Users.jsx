import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getme } from "../actions/authSlice";

export default function Users() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [users, setUsers] = useState();
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getme());
  }, []);

  useEffect(() => {
    if (user) {
      if (user.role !== "admin") {
        return navigate("/home");
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:1000/api/user/getUser", {
          headers: { "x-user": user.role },
        })
        .then((result) => {
          console.log(result);
          setUsers(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const deleteUser = (id, role) => {
    axios
      .delete("http://localhost:1000/api/user/deleteUser/" + id, {
        headers: { "x-user": user.role },
      })
      .then((result) => {
        const newUsers = users.filter((user) => {
          return user.username !== result.data.username;
        });
        setMsg("User succesfully deleted");
        setUsers(newUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <h2 className="font-bold text-3xl">USER MONITOR</h2>
        {msg && (
          <p className="mt-2 bg-green-400 w-2/5 py-1 px-2 rounded text-gray-900 text-center">
            {msg}
          </p>
        )}
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        No
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((user, i) => {
                        return (
                          <tr
                            key={user.id}
                            className="border-b dark:border-neutral-500 font-normal"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {i + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {user.username}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {user.email}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {user.role === "admin" ? (
                                <button className="bg-sky-500 font-medium px-4 py-1 rounded">
                                  Admin
                                </button>
                              ) : (
                                <button
                                  onClick={() => deleteUser(user.id, user.role)}
                                  className="bg-red-500 font-medium px-4 py-1 rounded"
                                >
                                  Delete
                                </button>
                              )}
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
      </div>
    </>
  );
}
