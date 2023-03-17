import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

export default function SignUpComp() {
    const { isLoading, user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [input, setInput] = useState({
        username: "",
        email: "",
        fullname: "",
        password: ""
    })
    const [response, setResponse] = useState({
        username: '',
        password: '',
        msg: ''
    })

    useEffect(() => {
        if(user) return navigate('/home')
    }, [])


    const submit = async (e) => {
        e.preventDefault()
        axios.post('http://localhost:1000/api/user/signup', {
            fullname: input.fullname,
            email: input.email,
            username: input.username,
            password: input.password
        }).then(result => {
            setResponse({
                username: '',
                password: '',
                msg: result.data.msg
            })
        }).catch(err => {
            console.log(err.response.data.msg)
            const data = err.response.data
            if(data.errorAt === 'username') {
                setResponse({password: '', username: data.msg, msg: ''})
            } else if(data.errorAt === 'password'){
                setResponse({username: '', password: data.msg, msg: ''})
            }

        })
    }

    return(
        <div className="flex justify-center p-5 pt-0 rounded-lg bg-slate-300 w-3/5 mx-auto">
            <form onSubmit={submit} className="flex flex-col mt-12 border-none p-8 pt-5 w-1/2 bg-slate-100 rounded-lg">
                <h1 className="font-bold text-2xl text-center mb-5">SIGN UP</h1>
                {response.msg && <p className="text-green-500 text-center font-medium">{response.msg}</p>}
                <div className="font-bold text-lg flex flex-col gap-y-1">
                    <label>Fullname</label>
                    <input required type="text" value={input.fullname} onChange={e => setInput({...input, fullname: e.target.value})} className="outline-none rounded bg-slate-100 px-3 py-0.5 ring-2 focus:ring-cyan-500" />
                </div>
                <div className="font-bold text-lg flex flex-col gap-y-1">
                    <label>Email</label>
                    <input required type="email" value={input.email} onChange={e => setInput({...input, email: e.target.value})} className="outline-none rounded bg-slate-100 px-3 py-0.5 ring-2 focus:ring-cyan-500" />
                </div>
                <div className="font-bold text-lg flex flex-col gap-y-1">
                    <label>Username</label>
                    <input required type="text" value={input.username} onChange={e => setInput({...input, username: e.target.value})} className="outline-none rounded bg-slate-100 px-3 py-0.5 ring-2 focus:ring-cyan-500" />
                    {response.username && <ErrorComp msg={response.username} />}
                </div>
                <div className="font-bold text-lg flex flex-col gap-y-1 my-3 ">
                    <label>Password</label>
                    <input required type="password" value={input.password} onChange={e => setInput({...input, password: e.target.value})} className="outline-none rounded bg-slate-100 px-3 py-0.5 ring-2 focus:ring-cyan-500" />
                    {response.password && <ErrorComp msg={response.password} />}
                </div>
                <button className="px-3 py-0.5 w-fit rounded bg-sky-500 mx-auto" type="submit">{isLoading ? 'Loading...' : 'Login'}</button>
                <p className="mt-6">Already have account? Login <Link className="text-sky-500" to={'/login'}>Here</Link> </p>
            </form>
        </div>
    )
}

function ErrorComp(props) {
    return <p className="font-medium text-red-500">{props.msg}</p>
}