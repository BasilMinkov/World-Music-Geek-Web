import React from 'react'
import './Library.scss'
import AlbumCard from '../../components/AlbumCard/AlbumCard'
import imageLink from '../../assets/images/nashenas.png'
import Layout from '../../hoc/Layout'

const Library: React.FC = () => {
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
                    <AlbumCard
                        imageLink={imageLink}
                        title="Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan"
                        author="Nashenas"
                        postId=""
                    />
                    <AlbumCard
                        imageLink={imageLink}
                        title="Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan"
                        author="Nashenas"
                        postId=""
                    />
                    <AlbumCard
                        imageLink={imageLink}
                        title="Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan"
                        author="Nashenas"
                        postId=""
                    />

                    <AlbumCard
                        imageLink={imageLink}
                        title="Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan"
                        author="Nashenas"
                        postId=""
                    />
                    <AlbumCard
                        imageLink={imageLink}
                        title="Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan"
                        author="Nashenas"
                        postId=""
                    />
                    <AlbumCard
                        imageLink={imageLink}
                        title="Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan"
                        author="Nashenas"
                        postId=""
                    />

                    <AlbumCard
                        imageLink={imageLink}
                        title="Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan"
                        author="Nashenas"
                        postId=""
                    />
                    <AlbumCard
                        imageLink={imageLink}
                        title="Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan"
                        author="Nashenas"
                        postId=""
                    />
                    <AlbumCard
                        imageLink={imageLink}
                        title="Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan"
                        author="Nashenas"
                        postId=""
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Library