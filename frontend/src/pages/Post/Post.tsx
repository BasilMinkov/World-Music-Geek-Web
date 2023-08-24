import React, { useState, useEffect } from 'react'
import './Post.scss'
import Layout from '../../hoc/Layout'
import Nashenas from '../../assets/images/nashenas.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { countryFlags } from '../../utils/countries'
import { countrySvg } from '../../utils/country'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

interface IPost {
    body: string
    date: string
    edited: string
    height: number
    id: number
    image: string
    tags: string[]
    title: string
    user_id: number
    width: number
    countryCode: string
    flag: string
}

const Post: React.FC = (props) => {
    const [post, setPost] = useState<IPost>(
        {
            body: "",
            date: "",
            edited: "",
            height: 0,
            id: 0,
            image: "",
            tags: [],
            title: "",
            user_id: 0,
            width: 0,
            countryCode: "",
            flag: "",
        }
    )
    const post_id = useParams()

    useEffect(() => {
        axios.get(
            `http://127.0.0.1:5000/post?id=${post_id?.postId}`
        )
            .then((response) => {
                const post = response?.data?.post
                setPost({
                    body: post?.body,
                    date: post?.date,
                    edited: post?.edited,
                    height: post?.height,
                    id: post?.id,
                    image: post?.image,
                    tags: post?.tags?.split('|'),
                    title: post?.title,
                    user_id: post?.user_id,
                    width: post?.width,
                    countryCode: 'AM',
                    flag: countryFlags['Armenia'],
                })
            })
    }, [post_id])

    useEffect(() => {
        console.debug('flag', post?.flag)
    }, [post])

    return (
        <Layout>
            <div className="post">
                <div className="post__banner">
                    <div className="post__image">
                        <img src={Nashenas} alt="" />
                    </div>
                </div>
                <div className="post__content">

                    <div className="post__main">
                        <div className="post__author">Nashenas</div>
                        <div className="post__title">Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan</div>
                        <div className="post__label">by United Sounds Of Asia, 2022</div>
                        <div className="post__body">
                            <ReactMarkdown>
                                [__Ветер слышит, ветер знает: как звучит Центральная Азия__](https://www.youtube.com/watch?v=3b3Io-kGclg)

                                На лекции узнаем, как читает [МС Гурбангулы](Гурбангулы Мяликгулыевич Бердымухамедов), как звучит ферганский джаз, а также о других музыкальных аллюзиях Центральной Азии, о том, как менялась ее музыкальная традиция: от степных ритмов и шашмакома до рок-н-ролла и фанка. Поговорим о самых разных явлениях музыкальной жизни среднеазиатских постсоветских республик: оркестрах, музыкальных кинофильмах, радиопрограммах, пластинках и гастрольных поездках. Лектор — Дарья Сапрынская (https://istina.msu.ru/profile/SaprynskaiaD/), исследовательница Центральной Азии, научный сотрудник ИСАА МГУ, автор телеграм-канала [«где твой хиджаб, cестра?»](https://t.me/gdehidjab).

                                [YouTube](https://www.youtube.com/watch?v=3b3Io-kGclg)
                            </ReactMarkdown>
                            {/* {post.body} */}
                        </div>
                        <div className="post__spotify"></div>
                        <div className="post__more">
                            <div className="more__title"></div>
                        </div>
                    </div>

                    <div className="post__sidebar">
                        <div className="post__sidebar__tags">
                            {
                                post?.tags?.map((item) => {
                                    return (
                                        <div>
                                            #{item}
                                        </div>
                                    )
                                })
                            }
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
        </Layout >
    )
}

export default Post
