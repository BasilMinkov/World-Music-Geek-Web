import React, { useState, useEffect } from 'react'
import './AlbumCard.scss'
import { useNavigate } from 'react-router'

interface IAlbumCard {
    imageLink: any
    title: any
    author?: any
    postId: any
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
                {/* /Users/karen/Documents/Github/World-Music-Geek-Web/frontend/src/assets/images/photos */}
                {/* <img src={link !== "" ? require(link) : ""} alt="" /> */}
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