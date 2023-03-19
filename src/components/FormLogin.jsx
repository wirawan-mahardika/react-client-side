import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getme, getUser } from "../actions/authSlice";
import { reset } from "../actions/authSlice";

export default function FormLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = useLocation()
    const { isError, isLoading, message, isSuccess, user, token } = useSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    

    useEffect(() => {
      if (user || isSuccess) {
        dispatch(getme());
        if (!localStorage.getItem("token")) {
          localStorage.setItem("token", token);
        }
        navigate("/home");
      }
      dispatch(reset());
    }, [user, isSuccess, navigate, dispatch, token]);
    
    const submit = (e) => {
        e.preventDefault()
        dispatch(getUser({username, password}))
    }

    return (
    <>
        <div className="flex justify-center p-5 rounded-lg bg-slate-300 w-3/5 mx-auto">
            <form onSubmit={submit} className="flex flex-col mt-20 border-none p-8 pt-5 w-1/2 bg-slate-100 rounded-lg">
                {isError &&<p className="text-red-500 font-semibold text-center mb-2">{state || message}</p>}
                {/* <p className="text-red-500 font-semibold text-center mb-2">{state && state}</p> */}
                <h1 className="font-bold text-2xl text-center mb-5">LOGIN</h1>
                <div className="font-bold text-lg flex flex-col gap-y-1">
                    <label>Username</label>
                    <input required type="text" value={username} onChange={e => setUsername(e.target.value)} className="outline-none rounded bg-slate-100 px-3 py-0.5 ring-2 focus:ring-cyan-500" />
                </div>
                <div className="font-bold text-lg flex flex-col gap-y-1 my-3 ">
                    <label>Password</label>
                    <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="outline-none rounded bg-slate-100 px-3 py-0.5 ring-2 focus:ring-cyan-500" />
                </div>
                <button className="px-3 py-0.5 w-fit rounded bg-sky-500 mx-auto" type="submit">{isLoading ? 'Loading...' : 'Login'}</button>
                <p className="mt-6">Dont have an account? Signup <Link className="text-sky-500" to={'/signup'}>Here</Link> </p>
            </form>
        </div>
    </>
    )
}