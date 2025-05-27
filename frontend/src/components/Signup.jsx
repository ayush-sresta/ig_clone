import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { NavLink, useNavigate } from 'react-router'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [registerForm, setRegisterForm] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleRegisterFormChange = (e) => {
        const { name, value } = e.target
        setRegisterForm({ ...registerForm, [name]: value })
    }
    const handleRegisterFormSubmit = async (e) => {
        e.preventDefault()
        console.log(registerForm);
        try {
            setLoading(true)
            const res = await axios.post("http://localhost:8000/api/v1/user/register", registerForm, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            })
            setRegisterForm({
                username: "",
                email: "",
                password: ""
            })
            console.log(res);

            toast.success(res.data.message)
            setTimeout(() => {
      navigate("/login") // ⏳ Delay navigation
    }, 400) 
        } catch (error) {
            console.log(error);

            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // "User already exists"
            } else {
                toast.error("Something went wrong!");
            } console.log(error);
            setRegisterForm({
                username: "",
                email: "",
                password: ""
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen w-screen">
                <form onSubmit={handleRegisterFormSubmit} className="shadow-lg p-8">
                    <div className='my-7'>
                        <h1 className="text-center text-4xl font-[500]">Sign up</h1>
                    </div>
                    <div className="space-y-5">

                        <div className="flex space-y-3 flex-col">
                            <Label>Username</Label>
                            <Input type="text" name="username" value={registerForm.username} onChange={handleRegisterFormChange} className="w-72 focus-visible:ring-transparent" required />
                        </div>
                        <div className="flex space-y-3 flex-col">
                            <Label>Email</Label>
                            <Input type="email" name="email" value={registerForm.email} onChange={handleRegisterFormChange} className="w-72 focus-visible:ring-transparent" required />
                        </div>
                        <div className="flex space-y-3 flex-col">
                            <Label>Password</Label>
                            <Input type="password" name="password" value={registerForm.password} onChange={handleRegisterFormChange} className="w-72 focus-visible:ring-transparent" required />
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
                                <Button type="submit" className="w-full my-10 text-lg py-5 cursor-pointer">Sign up</Button>
                            </>
                        )
                    }
                    <div className='flex justify-center'>
                        <span>Already have an account? <NavLink to="/login" className=" text-blue-500"> Login</NavLink></span>
                    </div>
                </form>
                <ToastContainer position="top-center" />
            </div>
        </>
    )
}

export default Signup