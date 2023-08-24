import React, { useState, useEffect } from 'react'
import Layout from '../../hoc/Layout'
import AlbumCard from '../../components/AlbumCard/AlbumCard'
import MockAlbum from './views/MockAlbum/MockAlbum'
import axios from 'axios'
import Accordion from '../../components/Accordion/Accordion'
import './Library.scss'

import Button from '../../components/Button/Button'

interface IPost {
    body: string
    date: string
    edited: string
    height: number
    id: number
    image: string
    tags: string
    title: string
    user_id: number
    width: number
}

const Library: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasNext, setHasNext] = useState<boolean>(false)
    const [hasPrev, setHasPrev] = useState<boolean>(false)
    const [posts, setPosts] = useState<IPost[]>([])
    const [limit, setLimit] = useState<number>(12)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setIsLoading(true)
        axios.get(
            `http://127.0.0.1:5000/posts?page=${page}&page_size=${limit}`
        )
            .then((response) => {
                console.log('response', response?.data?.posts)
                setPosts((prev) => {
                    return response?.data?.posts
                })
                setHasPrev(response?.data?.prev_page)
                setHasNext(response?.data?.next_page)
            })
            .then(() => {
                setIsLoading(false)
            })
    }, [limit])

    const handleClick = () => {
        setIsLoading(true)
        const nextPage = page + 1
        setPage(nextPage)
        axios.get(
            `http://127.0.0.1:5000/posts?page=${nextPage}&page_size=${limit}`
        )
            .then((response) => {
                setPosts((prev) => {
                    return [...prev, ...response?.data?.posts]
                })
                setHasPrev(response?.data?.prev_page)
                setHasNext(response?.data?.next_page)
            })
            .then(() => {
                setIsLoading(false)
            })
    }

    return (
        <Layout>
            <div className="library">
                <div className="library__sidebar">
                    <ul>
                        <li>
                            <Accordion
                                title="Country"
                            >
                                <ul>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                    <li>Test</li>
                                </ul>
                            </Accordion>
                        </li>
                        <li>
                            <Accordion
                                title="Genre"
                            >
                                <>
                                </>
                            </Accordion>
                        </li>
                        <li>
                            <Accordion
                                title="Instrument"
                            >
                                <>
                                </>
                            </Accordion>
                        </li>
                        <li>
                            <Accordion
                                title="labels"
                            >
                                <>
                                </>
                            </Accordion>
                        </li>
                    </ul>
                </div>

                <div className="library__main">
                    <div className="library__album-container">
                        {posts
                            .map((post, index) => {
                                return (
                                    <AlbumCard
                                        imageLink={post?.image}
                                        title={post?.title}
                                        // author={post.author}
                                        postId={post?.id}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </div>
                    {
                        isLoading &&
                        <div className="library__album-container">
                            <MockAlbum limit={limit} />
                        </div>
                    }
                    {
                        hasNext !== null &&
                        <Button
                            type="button"
                            disabled={isLoading}
                            onClick={handleClick}
                        >
                            Load More
                        </Button>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Library