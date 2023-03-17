import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import { useEffect } from "react";


export default function Beranda() {


    return (
        <>
            <header className="w-screen h-screen">
                <Menu />
                <div className="h-[88%] bg-slate-300 w-full flex">
                    <Navbar />
                    <div className="p-5 basis-5/6 overflow-y-auto">
                        <Outlet />
                    </div>
                </div>
            </header>
        </>
    )
}