import React from "react";

function Navbar(props) {
    return (
        <nav className="flex p-5 bg-black gap-x-10 justify-start text-white items-baseline">
            <h1 className="font-bold text-3xl">Dika WEB</h1>
            <ul className="flex gap-x-7">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/mahasiswa">Mahasiswa</a></li>
            </ul>
        </nav>
    )
}

export default Navbar