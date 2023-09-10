import React, {useState, useEffect} from 'react'
import './AlbumCard.scss'
import {useNavigate} from 'react-router'

interface IAlbumCard {
    imageLink: any
    postId: any
    artist: string
    album: string
    label: string
}

const AlbumCard: React.FC<IAlbumCard> = (props) => {
    const {imageLink, artist, album, label, postId} = props
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/post/${postId}`)
    };

    return (
        <div className="albumCard">
            <div
                className="albumCard__image"
                onClick={handleClick}
                title={`Перейти к посту о`}
            >
                {/* /Users/karen/Documents/Github/World-Music-Geek-Web/frontend/src/assets/ */}
                <img src={imageLink ? require(`./${imageLink}`) : ''} alt=""/>
            </div>
            <div className="albumCard__desc">
                <div className="albumCard__desc__title">
                    {album}
                </div>
                <div className="albumCard__desc__author-name">
                    {artist}
                </div>
            </div>
        </div>
    )
}

export default AlbumCard