import React from 'react'
import Post from './Post'

const Posts = () => {
    return (
        <>
            <div className="">
                <ul>

                    {
                        [1, 2, 3, 4, 5].map((post, index) => (
                            <Post key={index} post={post} />
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Posts