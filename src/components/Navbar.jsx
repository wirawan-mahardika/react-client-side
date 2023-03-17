import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getme } from "../actions/authSlice";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getme());
  }, [dispatch]);

  return (
    <nav className="basis-1/6 h-full bg-slate-500 p-3 pl-5 flex flex-col overflow-y-auto">
      <h2 className="font-bold text-lg text-slate-50 mt-2">User</h2>
      <ul className="pl-6 flex flex-col gap-y-1 mt-2">
        <li className="text-neutral-900 font-medium hover:text-slate-200">
          <NavLink to={"/home"}>Home</NavLink>
        </li>
        {user ? (
          <>
            <li className="text-neutral-900 font-medium hover:text-slate-200">
              <NavLink to={"/home"}>Profile</NavLink>
            </li>
            <li className="text-neutral-900 font-medium hover:text-slate-200">
              <NavLink to={"/cart"}>Cart</NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="text-neutral-900 font-medium hover:text-slate-200">
              <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li className="text-neutral-900 font-medium hover:text-slate-200">
              <NavLink to={"/signup"}>Signup</NavLink>
            </li>
          </>
        )}
      </ul>
      <h2 className="font-bold text-lg text-slate-50 mt-5">Shop</h2>
      <ul className="pl-6 flex flex-col gap-y-1 mt-2">
        <li className="text-neutral-900 font-medium hover:text-slate-200">
          <NavLink to={"/shop"}>Shop</NavLink>
        </li>
        <li className="text-neutral-900 font-medium hover:text-slate-200">
          <NavLink to={"/shop"}>Handphone</NavLink>
        </li>
        <li className="text-neutral-900 font-medium hover:text-slate-200">
          <NavLink to={"/shop"}>Laptop</NavLink>
        </li>
      </ul>

      <h2 className="font-bold text-lg text-slate-50 mt-5">Brand</h2>
      <ul className="pl-6 flex flex-col gap-y-1 mt-2">
        <li className="text-neutral-900 font-medium hover:text-slate-200">
          <NavLink to={"/acer"}>Acer</NavLink>
        </li>
        <li className="text-neutral-900 font-medium hover:text-slate-200">
          <NavLink to={"/apple"}>Apple</NavLink>
        </li>
        <li className="text-neutral-900 font-medium hover:text-slate-200">
          <NavLink to={"/asus"}>Asus</NavLink>
        </li>
      </ul>

      {user && user.role === "admin" && (
        <>
          <h2 className="font-bold text-lg text-slate-50 mt-5">Setting</h2>
          <ul className="pl-6 flex flex-col gap-y-1 mt-2">
            <li className="text-neutral-900 font-medium hover:text-slate-200">
              <NavLink to={"/acer"}>User</NavLink>
            </li>
            <li className="text-neutral-900 font-medium hover:text-slate-200">
              <NavLink to={"/acer"}>Barang</NavLink>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
}