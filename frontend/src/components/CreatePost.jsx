import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { readFile } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef()
  const [file, setFile] = useState("")
  const [caption, setCaption] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]

    if (file) {
      setFile(file)
      const dataUrl = await readFile(file)
      setImagePreview(dataUrl)
    }
  }

  const handleCreatePost = async () => {
    try {
      const res = await axios.post("http:localhost:8000/api/v1/post/addPost")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <Dialog open={open}>
        <DialogContent onInteractOutside={() => setOpen(false)}>
          <DialogHeader className='text-center font-semibold'>Create New Post</DialogHeader>
          <div className='flex gap-3 items-center'>
            <Avatar>
              <AvatarImage src="" alt="img" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className='font-semibold text-xs'>username</h1>
              <span className='text-gray-600 text-xs'>Bio here...</span>
            </div>
          </div>
          <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder="Write a caption..." />
          {
            imagePreview && (
              <div className='w-full h-72 flex justify-center'>
                <img className='h-full object-cover' src={imagePreview} alt="preview_image" />
              </div>
            )
          }
          <input ref={imageRef} type="file" className="hidden" onChange={handleFileChange} />

          <Button onClick={() => imageRef.current.click()} className="bg-blue-500 hover:bg-blue-700 cursor-pointer duration-200">Choose from computer</Button>


          {
            imagePreview && (
              loading ? (
                <Button>
                  <Loader2 className="animate-spin" />
                </Button>
              ) : (
                <Button onClick={handleCreatePost}>Post</Button>
              )
            )
          }
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreatePost