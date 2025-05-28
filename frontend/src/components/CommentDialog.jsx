import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { MoreHorizontal } from 'lucide-react'
import { Input } from './ui/input'

const CommentDialog = ({ open, setOpen }) => {
  const [commentText, setCommentText] = useState("")

  const handleCommentChange = (e) => {
    const inputText = e.target.value
    setCommentText(inputText.trim() ? inputText : "")
  }

  return (
    <Dialog open={open}>
      <DialogContent
        className="min-w-5xl p-0 overflow-hidden"
        onInteractOutside={() => setOpen(false)}
      >
        <div className="flex h-[400px]"> {/* Fixed height */}
          {/* Image */}
          <img
            className="w-[500px] object-cover h-full"
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            alt=""
          />

          {/* Right Panel */}
          <div className="flex flex-col w-full">
            {/* Scrollable comments */}
            <div className="flex-1 overflow-y-auto pr-4">
              <div className="flex pl-4 py-3 pr-4 justify-between border-b border-slate-800/30">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-bold">
                    username .{' '}
                    <span className="text-blue-500 font-normal cursor-pointer">Follow</span>
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="py-4">
                    <button className="text-red-500 font-medium cursor-pointer">Report</button>
                    <div className="h-[2px] opacity-30 bg-slate-800 my-2" />
                    <button className="font-normal cursor-pointer">Unfollow</button>
                    <div className="h-[2px] opacity-30 bg-slate-800 my-2" />
                    <button className="font-normal cursor-pointer">About this account</button>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col pl-4 py-3 gap-2 pr-4 border-b border-slate-800/30">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-bold">
                    username
                  </p>
                </div>
                <div className="comments text-sm font-[300] text-slate-800">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, porro commodi voluptatem quos quidem voluptates
                </div>
              </div>
              <div className="flex flex-col pl-4 py-3 gap-2 pr-4 border-b border-slate-800/30">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-bold">
                    username
                  </p>
                </div>
                <div className="comments text-sm font-[300] text-slate-800">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, porro commodi voluptatem quos quidem voluptates
                </div>
              </div>
              <div className="flex flex-col pl-4 py-3 gap-2 pr-4 border-b border-slate-800/30">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-bold">
                    username
                  </p>
                </div>
                <div className="comments text-sm font-[300] text-slate-800">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, porro commodi voluptatem quos quidem voluptates
                </div>
              </div>
            </div>

            {/* Comment input */}
            <div className="border-t border-slate-800 px-4 py-3">
              <div className="flex gap-4 items-center">
                <Input
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={handleCommentChange}
                  className="w-full outline-none focus-visible:ring-transparent border-none"
                />
                <button
                  disabled={!commentText.trim()}
                  className={`pr-4 ${!commentText.trim()
                    ? 'cursor-not-allowed text-blue-300'
                    : 'cursor-pointer text-blue-500'
                    }`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentDialog
