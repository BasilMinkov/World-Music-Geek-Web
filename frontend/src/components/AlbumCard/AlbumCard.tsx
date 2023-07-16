import React from 'react'
import './AlbumCard.scss'
import { useNavigate } from 'react-router'

interface IAlbumCard {
    imageLink: string
    title: string
    author: string
    postId: string
}

const AlbumCard: React.FC<IAlbumCard> = (props) => {
    const { imageLink, title, author, postId } = props
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/post/${postId}`)
    }

    return (
        <div className="albumCard">
            <div
                className="albumCard__image"
                onClick={handleClick}
                title={`Перейти к посту о ${title}`}
            >
                <img src={imageLink} alt="" />
            </div>
            <div className="albumCard__desc">
                <div className="albumCard__desc__title">
                    {title}
                </div>
                <div className="albumCard__desc__author-name">
                    {author}
                </div>
            </div>
        </div>
    )
}

export default AlbumCard