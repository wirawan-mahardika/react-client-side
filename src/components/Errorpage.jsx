import { NavLink } from "react-router-dom";

export default function Errorpage() {
    return (
        <>
            <div className="bg-slate-300 w-screen h-screen flex items-center justify-center flex-col">
                <h1 className="text-4xl">Oopss something went <span className="text-red-500">Wrong</span></h1>
                <p className="mt-5">Back to <NavLink className={'text-sky-500'} to={'/'}>Home</NavLink> page</p>
            </div>
        </>
    )
}