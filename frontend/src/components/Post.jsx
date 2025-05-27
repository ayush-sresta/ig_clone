import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { MoreHorizontal } from 'lucide-react'
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { RiChat3Line } from "react-icons/ri";
import CommentDialog from './CommentDialog';
import { Input } from './ui/input';

const Post = () => {
    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)

    const handleCommentChange = (e) => {
        const inputText = e.target.value
        if (inputText.trim()) {
            setText(inputText)
        } else {
            setText("") // Clear the text if input is empty
        }
    }
    return (
        <>
            <li className="p-4 mb-4 rounded-lg max-w-xl shadow-md">
                <div className="flex justify-between">

                    <div className="flex items-center gap-3">

                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1>username</h1>
                    </div>

                    <Dialog>
                        <DialogTrigger className="cursor-pointer"><MoreHorizontal /></DialogTrigger>
                        <DialogContent>
                            <button className="text-red-500 font-medium cursor-pointer">
                                Report
                            </button>
                            <div className="h-[2px] opacity-30 bg-slate-800 cursor-pointer"></div>
                            <button>
                                Add to Favorites
                            </button>
                            <div className="h-[1.5px] opacity-30 bg-slate-800 cursor-pointer"></div>
                            <button className="">
                                Unfollow
                            </button>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="my-5">

                    <img className="w-[500x]" src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center cursor-pointer text-2xl gap-5">
                        <FaRegHeart className="hover:text-gray-500 duration-200" />
                        <RiChat3Line onClick={() => setOpen(true)} className="hover:text-gray-500 duration-200" />
                        <FiSend className="hover:text-gray-500 duration-200" />
                    </div>
                    <div className="text-2xl cursor-pointer flex items-center">
                        <FaRegBookmark className="hover:text-gray-500 duration-200" />

                    </div>
                </div>
                <div className="my-3">
                    <p className='font-medium'>20,234 likes</p>
                </div>
                <div className="flex gap-3">
                    <strong>username</strong>
                    <p className='font-[400] text-[15px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="my-2">
                    <p onClick={() => setOpen(true)} className="text-gray-500 cursor-pointer">View all 1,282 comments</p>
                </div>
                <CommentDialog open={open} setOpen={setOpen} />
                <div className="my-4 flex items-center relative">
                    <Input type="text" placeholder="Add a comment..." value={text} onChange={handleCommentChange} className="outline-none border-none text-sm focus-visible:ring-transparent w-full" />
                    {

                        text && <span className='absolute right-4'>Post</span>
                    }
                </div>
                <div className="h-[1px] opacity-30 bg-slate-800 cursor-pointer"></div>
            </li>
        </>
    )
}

export default Post