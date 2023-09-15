import React, {useState, useEffect} from 'react'
import './Post.scss'
import Layout from '../../hoc/Layout'
import Nashenas from '../../assets/images/nashenas.png'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router'
import {countryFlags} from '../../utils/countries'
import {countrySvg} from '../../utils/country'
import {ReactMarkdown} from 'react-markdown/lib/react-markdown'
import {IPost} from "../../types";

const Post: React.FC = (props) => {
    const [post, setPost] = useState<IPost>(
        {
            id: null,
            artist: '',
            album: '',
            label: '',
            year: null,
            body: '',
            tags: '',
            image: '',
            width: null,
            height: null,
            date: '',
            edited: '',
            user_id: null
        }
    )
    const post_id = useParams()
    const backUrl = process.env.REACT_APP_BACKEND_URL + ':5000/'            
    
    useEffect(() => {
        axios.get(backUrl + 'post?id=' + post_id?.postId)
            .then((response) => {
                const post = response?.data?.post
                // console.log('post', post)
                setPost({
                    id: post?.id,
                    artist: post?.artist,
                    album: post?.album,
                    label: post?.label,
                    body: post?.body,
                    date: post?.date,
                    edited: post?.edited,
                    height: post?.height,
                    image: post?.image,
                    tags: post?.tags?.split('|'),
                    year: post?.year,
                    user_id: post?.user_id,
                    width: post?.width,
                })
            })
    }, [post_id])

    return (
        <Layout>
            <div className="post">
                <div className="post__banner">
                    <div className="post__image">,
                        <img src={backUrl + post?.image} alt=""/>
                    </div>
                </div>
                <div className="post__content">

                    <div className="post__main">
                        <div className="post__author">{post?.artist}</div>
                        <div className="post__title">{post?.album}</div>
                        <div className="post__label">by {post?.label}, {post?.year}</div>
                        <div className="post__body">
                            <ReactMarkdown>
                                {post?.body}
                            </ReactMarkdown>
                        </div>
                        <div className="post__spotify"></div>
                        <div className="post__more">
                            <div className="more__title"></div>
                        </div>
                    </div>

                    <div className="post__sidebar">
                        <div className="post__sidebar__tags">
                            {/*{*/}
                            {/*    post?.tags?.map((item: any) => {*/}
                            {/*        return (*/}
                            {/*            <div>*/}
                            {/*                #{item}*/}
                            {/*            </div>*/}
                            {/*        )*/}
                            {/*    })*/}
                            {/*}*/}
                            <div>

                                {/* Часть со страной не делаем */}
                                {/* <span className="post__sidebar__tag--flag">
                                    {post?.flag}
                                </span>
                                <span className="post__sidebar__tag--country">
                                    <svg viewBox='0 0 0 0' width={100} height={100} stroke='#001253'>
                                        <path d={countrySvg['AM']['d']} fill="#001253" width={100} height={100} />
                                    </svg>
                                </span> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}

export default Post
