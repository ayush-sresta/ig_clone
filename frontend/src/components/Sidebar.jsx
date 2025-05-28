import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { toast } from 'sonner' // ✅ ONLY keep this one
import Nexly from "../assets/nexly_one.png"
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'


const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout")
      console.log(res);

      toast.success(res.data.message) // ✅ sonner toast
      setTimeout(() => {
        dispatch(setAuthUser(null))
        navigate("/login") // ⏳ Delay navigation
      }, 400)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed")
    }
  }

  const handleSidebarClick = (text) => {
    if (text === "Create") {
      setOpen(true)
    }
  }
  const sideBarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar>
          <AvatarImage src={user?.profilePicture} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile"
    }
  ]
  return (
    <>
      <div className="fixed top-0 left-0 px-4 z-10 w-[16%] h-screen border-r-2 border-r-black">
        <img src={Nexly} className="w-40" alt="nexly logo" />

        <ul className="flex flex-col gap-3 mb-[73px]">
          {sideBarItems.map((item, index) => (
            <li
              onClick={() => handleSidebarClick(item.text)}
              key={index}
              className="flex gap-3 items-center relative hover:bg-gray-200 duration-300 cursor-pointer p-3 rounded-lg"
            >
              <span>{item.icon}</span>
              <p className="text-[19px]">{item.text}</p>
            </li>
          ))}
        </ul>

        <p
          onClick={logoutHandler}
          className="flex gap-3 text-[19px] hover:bg-gray-200 duration-300 cursor-pointer p-3 rounded-lg"
        >
          <LogOut /> Log out
        </p>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </>
  )
}

export default Sidebar
