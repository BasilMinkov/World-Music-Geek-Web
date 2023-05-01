import React from 'react'
import Header from '../../component/Header/Header'
// import Footer from '../../component/Footer/Footer'
import AlbumImg1 from '../../assets/1.jpg'
import AlbumImg2 from '../../assets/2.jpg'
import AlbumImg3 from '../../assets/3.jpg'
import AlbumImg4 from '../../assets/4.jpg'
import AlbumImg5 from '../../assets/5.jpg'
import AlbumImg6 from '../../assets/6.jpg'
import AlbumImg7 from '../../assets/7.jpg'
import AlbumImg8 from '../../assets/8.jpg'
import AlbumImg9 from '../../assets/9.jpg'

const Layout = (props) => {
  // const { children } = props

  return (
    <div className="container">
      <Header></Header>
      <div className="content">
        <div className="sidebar">
          <nav>
            <ul>
              <li>country</li>
              <li>genre</li>
              <li>instrument</li>
              <li>labels</li>
            </ul>
          </nav>
        </div>
        <div className="library">
          <div className="album">
            <div className="album__img">
              <img src={AlbumImg1} alt="" />
            </div>
            <div className="album__info">
              <div className="album__name">Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan</div>
              <div className="album__author">Nashenas</div>
            </div>
          </div>
          <div className="album">
            <div className="album__img">
              <img src={AlbumImg2} alt="" />
            </div>
            <div className="album__info">
              <div className="album__name">Virtuoso from Afghanistan</div>
              <div className="album__author">Mohammad Omar</div>
            </div>
          </div>
          <div className="album">
            <div className="album__img">
              <img src={AlbumImg3} alt="" />
            </div>
            <div className="album__info">
              <div className="album__name">Homayun Sakhi – Music of Central Asia, Vol. 3: Homayun Sakhi: The…</div>
              <div className="album__author">Homayun Sakhi</div>
            </div>
          </div>
          <div className="album">
            <div className="album__img">
              <img src={AlbumImg4} alt="" />
            </div>
            <div className="album__info">
              <div className="album__name">Mien (Yao): Cannon Singing in China, Vietnam, Laos</div>
              <div className="album__author">Mien (Yao)</div>
            </div>
          </div>
          <div className="album">
            <div className="album__img">
              <img src={AlbumImg5} alt="" />
            </div>
            <div className="album__info">
              <div className="album__name">Hand to Earth</div>
              <div className="album__author">Australian Art Orchestra</div>
            </div>
          </div>
          <div className="album">
            <div className="album__img">
              <img src={AlbumImg6} alt="" />
            </div>
            <div className="album__info">
              <div className="album__name">Kanawa</div>
              <div className="album__author">Nahawa Doumbia</div>
            </div>
          </div>
          <div className="album">
            <div className="album__img">
              <img src={AlbumImg7} alt="" />
            </div>
            <div className="album__info">
              <div className="album__name">Indian Talking Machine</div>
              <div className="album__author">Various Artists</div>
            </div>
          </div>
          <div className="album">
            <div className="album__img">
              <img src={AlbumImg8} alt="" />
            </div>
            <div className="album__info">
              <div className="album__name">This Pale</div>
              <div className="album__author">Shujaat Khan & Katayoun Goudarzi</div>
            </div>
          </div>
          <div className="album">
            <div className="album__img">
              <img src={AlbumImg9} alt="" />
            </div>
            <div className="album__info">
              <div className="album__name">Umdali</div>
              <div className="album__author">Malcolm Jiyane Tree-O</div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default Layout