import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/authSlice";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 rounded-full bg-slate-700 mx-auto"></div>
        <h1 className="font-bold text-3xl capitalize">
          {user && user.fullname}
        </h1>
        <p>
          Welcome {user && user.role}{" "}
          <span className="capitalize">{user && user.fullname}</span>
        </p>

        <div className="flex flex-col gap-y-3 mt-10">
          <h3 className="text-2xl font-bold mx-auto">BIODATA</h3>
          <ul className="flex flex-col">
            <li className="capitalize">Nama : {user && user.fullname}</li>
            <li>Email : {user && user.email}</li>
            <li>Username : {user && user.username}</li>
          </ul>
          {user && user && (
            <button
              onClick={userLogout}
              className="px-3 py-0.5 bg-slate-900 text-gray-50 font-medium rounded w-fit mx-auto"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
}
