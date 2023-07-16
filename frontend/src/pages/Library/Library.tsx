import React, { useState } from 'react'
import Layout from '../../hoc/Layout'
import AlbumCard from '../../components/AlbumCard/AlbumCard'
import './Library.scss'

const Library: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const data = [
        {
            "id": "1",
            "title": "Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan",
            "author": "Nashenas",
            "postId": "",
            "imageLink": "https://i.ibb.co/PWQK6nh/nashenas.png",
        },
        {
            "id": "2",
            "title": "Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan",
            "author": "Nashenas",
            "postId": "",
            "imageLink": "https://i.ibb.co/PWQK6nh/nashenas.png",
        },
        {
            "id": "3",
            "title": "Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan",
            "author": "Nashenas",
            "postId": "",
            "imageLink": "https://i.ibb.co/PWQK6nh/nashenas.png",
        },
        {
            "id": "4",
            "title": "Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan",
            "author": "Nashenas",
            "postId": "",
            "imageLink": "https://i.ibb.co/PWQK6nh/nashenas.png",
        },
        {
            "id": "5",
            "title": "Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan",
            "author": "Nashenas",
            "postId": "",
            "imageLink": "https://i.ibb.co/PWQK6nh/nashenas.png",
        },
        {
            "id": "6",
            "title": "Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan",
            "author": "Nashenas",
            "postId": "",
            "imageLink": "https://i.ibb.co/PWQK6nh/nashenas.png",
        },
        {
            "id": "7",
            "title": "Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan",
            "author": "Nashenas",
            "postId": "",
            "imageLink": "https://i.ibb.co/PWQK6nh/nashenas.png",
        },
        {
            "id": "8",
            "title": "Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan",
            "author": "Nashenas",
            "postId": "",
            "imageLink": "https://i.ibb.co/PWQK6nh/nashenas.png",
        },
        {
            "id": "9",
            "title": "Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan",
            "author": "Nashenas",
            "postId": "",
            "imageLink": "https://i.ibb.co/PWQK6nh/nashenas.png",
        },
    ]

    return (
        <Layout>
            <div className="library">
                <div className="library__sidebar">
                    <ul>
                        <li>Country</li>
                        <li>Genre</li>
                        <li>Instrument</li>
                        <li>labels</li>
                    </ul>
                </div>
                <div className="library__album-container">
                    {data.map((post, key) => {
                        return (
                            <AlbumCard
                                imageLink={post.imageLink}
                                title={post.title}
                                author={post.author}
                                postId={post.postId}
                            />
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default Library