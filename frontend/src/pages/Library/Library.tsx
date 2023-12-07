import React, { useState, useEffect } from "react";
import Layout from "../../hoc/Layout";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import MockAlbum from "./views/MockAlbum/MockAlbum";
import axios from "axios";
import Accordion from "../../components/Accordion/Accordion";
import countriesAll from "../../assets/countries";
import "./Library.scss";
import { IPost } from "../../types";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

const Library: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [countriesValid, setValidCountries] = useState(null);
  const [rubricator, setRubricator] = useState(null);
  const [, setHasPrev] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [limit] = useState<number>(12);
  const [page, setPage] = useState<number>(1);
  const backUrl = process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_DOMAIN_PROD : process.env.REACT_APP_DOMAIN_DEV;

  // Get list of not null countries {'KEY' : 'albums': number}
  useEffect(() => {
    axios.get(backUrl + `/countries`).then((response) => {
      setValidCountries(response?.data?.values);
    });
  }, []);

  const countries = () => {
    let res = [];
    if (countriesValid != null) {
      for (let key in countriesAll) {
        const item: string = countriesAll[key];
        if (countriesValid[key]["albums"] > 0) {
          res.push(item);
        }
      }
    } else {
      res.push('WorldMusicGeek');
    }
    return res;
  };

  // Get list of not null rubrics {'genres', 'instruments', 'peoples', 'labels'}
  useEffect(() => {
    axios.get(backUrl + `/rubricator`).then((response) => {
      console.log(response?.data);
      setRubricator(response?.data);
    });
  }, []);
  const instruments =
    rubricator != null ? rubricator["instruments"] : ["WorldMusicGeek"];
  const genres = rubricator != null ? rubricator["genres"] : ["WorldMusicGeek"];
  const peoples =
    rubricator != null ? rubricator["peoples"] : ["WorldMusicGeek"];
  const labels = rubricator != null ? rubricator["labels"] : ["WorldMusicGeek"];

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).toString();
    console.log("query", query);
    setIsLoading(true);
    const postsUrlQuery =
      backUrl + `/posts?page=${page}&page_size=${limit}&${query}`;

    axios
      .get(postsUrlQuery)
      .then((response) => {
        // console.log('response', response)
        setPosts((prev) => {
          return response?.data?.posts;
        });
        setHasPrev(response?.data?.prev_page);
        setHasNext(response?.data?.next_page);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [limit]);

  const handleClick = () => {
    setIsLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);
    const postsUrl = backUrl + `/posts?page=${nextPage}&page_size=${limit}`;

    axios
      .get(postsUrl)
      .then((response) => {
        setPosts((prev) => {
          return [...prev, ...response?.data?.posts];
        });
        setHasPrev(response?.data?.prev_page);
        setHasNext(response?.data?.next_page);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  // Make list menu
  function getListMenu(list: Array<string>, isLabel: boolean) {
    let content = [];
    for (let key in list) {
      const item = list[key];
      const link = isLabel === true ? "library?label=" + item : "library?tag=" + item;
      content.push(
        <li>
          <a
            style={{textDecoration:'none'}}
            href={window.location.origin + "/" + link}
            onClick={() => navigate(link)}
          >
            {item}
          </a>
        </li>,
      );
    }
    return content;
  };

  return (
    <Layout>
      <div className="library">
        <div className="library__sidebar">
          <ul>
            <li>
              <Accordion title="Country">
                <ul>{getListMenu(countries(), false)}</ul>
              </Accordion>
            </li>
            <li>
              <Accordion title="Genre">
                <ul>{getListMenu(genres, false)}</ul>
              </Accordion>
            </li>
            <li>
              <Accordion title="Instrument">
                <ul>{getListMenu(instruments, false)}</ul>
              </Accordion>
            </li>
            <li>
              <Accordion title="Peoples">
                <ul>{getListMenu(peoples, false)}</ul>
              </Accordion>
            </li>
            <li>
              <Accordion title="Labels">
                <ul>{getListMenu(labels, true)}</ul>
              </Accordion>
            </li>
          </ul>
        </div>

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
          {isLoading && (
            <div className="library__album-container">
              <MockAlbum limit={limit} />
            </div>
          )}
          {hasNext !== null && (
            <Button type="button" disabled={isLoading} onClick={handleClick}>
              Load More
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Library;
