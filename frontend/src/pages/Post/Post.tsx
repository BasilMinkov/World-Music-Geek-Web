import React, { useState, useEffect } from "react";
import "./Post.scss";
import Layout from "../../hoc/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { IPost } from "../../types";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import AppleMusicIcon from "../../assets/images/streamings/US-UK_Apple_Music_Listen_on_Lockup_RGB_blk_072720.svg";
import BandCampIcon from "../../assets/images/streamings/bandcamp-logotype-dark-512.png";
              
const Post: React.FC = (props) => {
  const [post, setPost] = useState<IPost>({
    id: null,
    artist: "",
    album: "",
    label: "",
    year: null,
    body: "",
    tags: "",
    image: "",
    width: null,
    height: null,
    date: "",
    edited: "",
    user_id: null,
    spotify: "",
    applemusic: "",
    bandcamp: "",
  });
  const post_id = useParams();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const backUrl = process.env.REACT_APP_BACKEND_URL + ':5000/';

  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(backUrl + 'post?id=' + post_id?.postId)
      .then((response) => {
        const post = response?.data?.post;
        console.log("post", post);
        setPost({
          id: post?.id,
          artist: post?.artist,
          album: post?.album.trim(),
          label: post?.label,
          body: post?.body,
          date: post?.date,
          edited: post?.edited,
          height: post?.height,
          image: post?.image,
          tags: post?.tags,
          year: post?.year,
          user_id: post?.user_id,
          width: post?.width,
          spotify: post?.spotify,
          applemusic: post?.applemusic,
          bandcamp: post?.bandcamp,
        });
        return post;
      })
      .then((post) => {
        const country = post?.tags.split("|").find((item: string) => {
          return item[0].toUpperCase() === item[0];
        });
        setCountry(country);
        axios
          .get(backUrl + `posts?page=1&page_size=9&tag=${country}`)
          .then((response) => {
            // console.log('response', response)
            setPosts((prev) => {
              return response?.data?.posts;
            });
          });
      });
  }, [post_id]);

  const handleClick = (event: any) => {
    navigate(`/library?tag=${event.target.innerText.slice(1)}`);
  };

  const spotifyLink = () => {
    const result = post?.spotify?.match(new RegExp(/album\/(.*?)(\?|$)/));
    if (result !== null) {
      return result[1];
    }
  };
  
  console.log(post.image);
  return (
    <Layout>
      <div className="post">
        <div className="post__banner">
          <div className="post__image">
            <img src={post?.image ? require(`./${post?.image}`) : ""} alt="" />
          </div>
        </div>
        <div className="post__content">
          <div className="post__main">
            <div className="post__author">{post?.artist}</div>
            <div className="post__title">{post?.album}</div>
            <div className="post__label">
              by {post?.label}, {post?.year}
            </div>
            <div className="post__body">
              <ReactMarkdown>{post?.body}</ReactMarkdown>
            </div>
            {post?.spotify && (
              <div className="post__streamings">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src={`https://open.spotify.com/embed/album/${spotifyLink()}?utm_source=generator`}
                  width="600"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
                <div className="post__streamings__icon-container">
                  {post?.applemusic && (
                    <Link to={post?.applemusic} target={"_blank"}>
                      <img
                        className="post__streamings__icon"
                        src={AppleMusicIcon}
                        alt=""
                      />
                    </Link>
                  )}
                  {post?.bandcamp && (
                    <Link to={post?.bandcamp} target={"_blank"}>
                      <img
                        className="post__streamings__icon"
                        src={BandCampIcon}
                        alt=""
                      />
                    </Link>
                  )}
                </div>
              </div>
            )}
            <div className="post__more">
              <div className="post__more__title">More from {country}</div>
              <div className="library__main">
                <div className="library__album-container">
                  {posts.map((post, index) => {
                    return (
                      <AlbumCard
                        imageLink={post?.image}
                        postId={post?.id}
                        artist={post?.artist}
                        album={post?.album}
                        label={post?.label}
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="post__sidebar">
            <div className="post__sidebar__tags">
              {post?.tags?.split("|").map((item: any) => {
                return (
                  <div
                    onClick={handleClick}
                    className="post__sidebar__tags__item"
                  >
                    #{item}
                  </div>
                );
              })}
              <div>
                {/* Часть со страной не делаем */}
                {/*<span className="post__sidebar__tag--flag">*/}
                {/*    {post?.flag}*/}
                {/*</span>*/}
                {/*{country?.length > 0 &&*/}
                {/*    <span className="post__sidebar__tag--country">*/}
                {/*    <svg viewBox="-54 -10 100 50" width={100} height={50} stroke='#001253'>*/}
                {/*        <path*/}
                {/*            width={100}*/}
                {/*            height={50}*/}
                {/*            d={`${countryBorders[countries[country]].d}`}*/}
                {/*            d={"M0,0l-9.7-4.4l-8.5,0.2l-5.7,1.7l-5.6,4l-9.9-0.8l-1.6,4.8l-7.9,0.2l-5.1,6.1l3.6,3l-2,5l4.2,3.6l3.7,6.4l5.8-0.1l5.4,3.5l3.6-0.8l0.9-2.7l5.7,0.2l4.6,3.5l8-0.7l3.1-3.7l4.6,1.5l3.2-0.6l-1.7,2.4l2.3,3l1.2-1.4l1.2-1.5l-0.1-3.6l1.9,1.3l5.5-1.8l3,1.2h4.3l5.7-2.5l2.8,0.2l5.9-1.1l2.1-1l6.2,0.9l2.1,1.6l2.3-1.1l0,0l-3.7-5.2l0.7-2l-2.9-7.3l3.3-1.8l-2.4-1.9l-4.2-1.5v-3.1l-1.3-2.2l-5.6-3l-5.4,0.3l-5.5,3.2l-4.5-0.6l-5.8,1z"}*/}
                {/*            fill={'#fff'}*/}
                {/*            stroke={'#000'}/>*/}
                {/*    </svg>*/}
                {/*</span>*/}
                {/*}*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
