import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
    return (
        <div className="basis-1/3 flex flex-col gap-y-3 shadow-slate-400 border border-black shadow p-4">
            <img src="https://source.unsplash.com/category/buildings/600x400"/>
            <h2 className="font-bold text-xl text-center">{props.barang}</h2>
            <p className="italic text-center text-red-500">{props.harga}</p>
            <button>
                <Link to={{pathname: `/product/${props.id}`}} state={{barang: props.barang, harga: props.harga, jumlah: props.jumlah}} >
                    Detail
                </Link>
            </button>
        </div>
    )
}

function Products() {
    return (
        <div className="flex p-5 gap-x-5 ">
            <Card barang="Laptop" harga="50000000" id='1' jumlah={10} />
            <Card barang="Boots" harga="1000000"  id='2' jumlah={20} />
            <Card barang="HandPhone" harga="20000000" id='3' jumlah={9} />

        </div>
    )
}

export default Products