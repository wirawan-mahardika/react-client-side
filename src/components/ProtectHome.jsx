import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getme } from "../actions/authSlice";

export default function ProtectHome() {
    const {isError, user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
        dispatch(getme())
    }, [dispatch])

    useEffect(() => {
        if(isError){
          navigate('/login')
        }
    }, [isError, navigate])
  return (
    <div>
      <p className="font-bold text-3xl mb-5">Welcome {user && user.username}</p>
      <p>Glad to Have you back</p>
      <p>We have some awesome gadget made by famous brand</p>
      <p>Check our shop to know more</p>
    </div>
  )
}
