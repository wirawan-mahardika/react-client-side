import { Link, Outlet, useLoaderData } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getme } from "../actions/authSlice";
import { axiosJwtGet } from '../axiosJwt/axios'

export default function Shop() {
    const {isError} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const actionData = useLoaderData()
    const [data] = useState(actionData)
    
    useEffect(() => {
        dispatch(getme())
    }, [dispatch])

    useEffect(() => {
        if(isError){
            navigate('/login')
        }
    }, [isError, navigate])
    return (
        <>
            <div className="grid grid-cols-3 gap-3 gap-y-2">
                {
                    data ? data.map(item => {
                        return (
                            <div key={item.id} className="text-center flex flex-col">
                                <img src={item.src} alt={item.id} />
                                <p className='font-bold text-lg'>{item.name}</p>
                                <p className='text-red-500'>{item.price}</p>
                                <button className='px-4 py-0.5 bg-sky-500 rounded w-fit font-semibold mx-auto'><Link to={'/shop/detail'} state={{
                                    name: 'Asus Rog ryzen 9 7500H',
                                    price: 54000000
                                }}>Add to Cart</Link></button>
                            </div>
                        )
                    }) : ''
                }
            </div>
            <Outlet />
        </>
    )
}

export const acerLoader = () => {
    const data = axiosJwtGet('acer')
    return data
}