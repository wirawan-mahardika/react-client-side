import React from "react";
import { useLocation } from "react-router-dom";


function Detail(props) {
    let location = useLocation()
    return (
        <div className="w-fit text-center flex flex-col gap-y-3 mx-auto shadow shadow-slate-300 rounded p-4">
            <img src="https://source.unsplash.com/category/buildings" className="w-[300px]" />
            <h1>{location.state.barang}</h1>
            <p><i>{location.state.harga}</i></p>
            <p>Tersedia : {location.state.jumlah}</p>
        </div>
    )
}

export default Detail