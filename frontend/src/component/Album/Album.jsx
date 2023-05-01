import React from 'react'

const Album = (props) => {
  const { albumImage, albumName, albumAuthor} = props;

  return (
    <div className="album">
      <div className="album__img">
        <img src={albumImage} alt="" />
      </div>
      <div className="album__info">
        <div className="album__name">{albumName}</div>
        <div className="album__author">albumAuthor</div>
      </div>
    </div>
  )
}

export default Album;