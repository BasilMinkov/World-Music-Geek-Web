import React, { useState } from 'react'
import Layout from '../../hoc/Layout'
import AlbumCard from '../../components/AlbumCard/AlbumCard'
import data from '../../data.json'
import './Library.scss'

const Library: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Добавить fetch

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