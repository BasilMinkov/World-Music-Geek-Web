import React from 'react'
import './PostPreview.scss'

interface IPostPreview {
    key?: number
    author: string
    title: string
    release_date: string
    imageLink: string
}

const PostPreview: React.FC<IPostPreview> = (props) => {
    const { author, title, release_date, imageLink } = props

    return (
        <div className="postPreview">
            <div className="postPreview__desc">
                <div className="postPreview__desc__author">
                    {author}
                </div>
                <div className="postPreview__desc__title">
                    {title}
                </div>
                <div className="postPreview__desc__label">
                    {release_date}
                </div>
            </div>
            <div className="postPreview__image">
                <img src={imageLink} alt="" />
            </div>
        </div>
    )
}

export default PostPreview