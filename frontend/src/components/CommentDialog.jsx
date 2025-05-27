import React from 'react'
import { Dialog, DialogContent } from './ui/dialog'

const CommentDialog = ({open, setOpen}) => {
  return (
    <>
    <Dialog open={open}>
      <DialogContent className="p-0" onInteractOutside={() => setOpen(false)}>
        <img className="w-[500x]" src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
      </DialogContent>
    </Dialog>
    </>
  )
}

export default CommentDialog