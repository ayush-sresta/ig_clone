import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { AlignRight } from 'lucide-react'
import { Button } from './ui/button'
import Posts from './Posts'

const Feed = () => {
    return (
        <>
        <div className="flex-1 my-8 flex flex-col items-center pl-[7%]">
            <Posts />
        </div>
        </>
    )
}

export default Feed