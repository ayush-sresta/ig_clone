import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { NavLink, useNavigate } from 'react-router'
import { Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleLoginFormChange = (e) => {
        const { name, value } = e.target
        setLoginForm({ ...loginForm, [name]: value })
    }
    const handleLoginFormSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post("http://localhost:8000/api/v1/user/login", loginForm, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            })
            setLoginForm({
                username: "",
                password: ""
            })
            console.log(res.data.user);
            
            toast.success(res.data.message)
            setTimeout(() => {
                dispatch(setAuthUser(res.data.user))
                 // Dispatching the user data to the Redux store
                navigate("/") // ⏳ Delay navigation
            }, 400)
        } catch (error) {
            console.log(error);

            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // "User already exists"
            } else {
                toast.error("Something went wrong!");
            } console.log(error);
            setLoginForm({
                username: "",
                password: ""
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen w-screen">
                <form onSubmit={handleLoginFormSubmit} className="shadow-lg p-8">
                    <div className='my-7'>
                        <h1 className="text-center text-4xl font-[500]">Login</h1>
                    </div>
                    <div className="space-y-5">

                        <div className="flex space-y-3 flex-col">
                            <Label>Username</Label>
                            <Input type="text" name="username" value={loginForm.username} onChange={handleLoginFormChange} className="w-72 focus-visible:ring-transparent" required />
                        </div>
                        <div className="flex space-y-3 flex-col">
                            <Label>Password</Label>
                            <Input type="password" name="password" value={loginForm.password} onChange={handleLoginFormChange} className="w-72 focus-visible:ring-transparent" required />
                        </div>
                    </div>
                    {
                        loading ? (
                            <>
                                <Button className="w-full my-10 text-lg py-5 cursor-pointer">
                                    <Loader2 className='h-4 text-lg w-4 animate-spin mr-2' />
                                    <p>Please wait.</p>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button type="submit" className="w-full my-10 text-lg py-5 cursor-pointer">Login</Button>
                            </>
                        )
                    }
                    <div className='flex justify-center'>
                        <span>Don't have an account? <NavLink to="/signup" className=" text-blue-500"> Sign up</NavLink></span>
                    </div>
                </form>
                <ToastContainer position="top-center" />
            </div>
        </>
    )
}

export default Login