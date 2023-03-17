import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { logout } from "../actions/authSlice";

export default function Menu() {
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogout = () => {
        localStorage.clear()
        dispatch(logout())
        navigate('/login')
    }

    return (
    <>
        <div className="p-5 bg-gray-800 flex justify-between items-center text-stone-50 h-[12%]">
            <h1 className="font-bold text-3xl text-amber-600 font-serif">King<span className="font-sans text-teal-600">TECH</span></h1>
            <div className="flex items-center gap-x-5">
                <h1 className="font-bold uppercase">{user ? 'Hello '+user.username : 'Guest'}</h1>
                <div className="w-10 h-10 bg-black rounded-full"></div>
                {user && <button onClick={userLogout} className="px-3 py-0.5 bg-sky-500 rounded">Logout</button>}
            </div>
        </div>
    </>
    )
}