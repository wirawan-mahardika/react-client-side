import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import { getme } from '../actions/authSlice'
import { axiosJwtGet } from '../axiosJwt/axios'

export default function Acer() {
    const {isError} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const actionData = useLoaderData()
    const [data, setData] = useState(actionData)
    
    useEffect(() => {
        dispatch(getme())
    }, [dispatch])

    useEffect(() => {
        if(isError){
            navigate('/login')
        }
    }, [isError, navigate])

    const addCart = (item) => {
        navigate('/acer/detail', {state: item})
    }
    return (
        <>
            <div className="grid grid-cols-3 gap-3 gap-y-2">
                {
                    data && data.map(item => {
                        return (
                            <div key={item.id} className="text-center flex flex-col">
                                <img src={item.src} alt={item.id} />
                                <p className='font-bold text-lg'>{item.name}</p>
                                <p className='text-red-500'>{item.price}</p>
                                <button onClick={() => addCart(item)} className='px-4 py-0.5 bg-sky-500 rounded w-fit font-semibold mx-auto'>Add to Cart</button>
                            </div>
                        )
                    }) 
                }
            </div>
            <Outlet />
        </>
    )
}

export const acerLoaderData = () => {
    const data = axiosJwtGet('acer')
    return data
}
