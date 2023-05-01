import React from 'react'
import Header from '../../component/Header/Header'
// import Footer from '../../component/Footer/Footer'
import Album from '../../component/Album/Album'
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
          <Album 
            albumImage={AlbumImg1}
            albumName='Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan'
            albumAuthor='Life Is a Heavy Burden: Ghazals & Poetry From Afghanistan'
          />
          <Album 
            albumImage={AlbumImg2}
            albumName='Virtuoso from Afghanistan'
            albumAuthor='Mohammad Omar'
          />
          <Album 
            albumImage={AlbumImg3}
            albumName='Homayun Sakhi – Music of Central Asia, Vol. 3: Homayun Sakhi: The…'
            albumAuthor='Homayun Sakhi'
          />
          <Album 
            albumImage={AlbumImg4}
            albumName='Mien (Yao): Cannon Singing in China, Vietnam, Laos'
            albumAuthor='Mien (Yao)'
          />
          <Album 
            albumImage={AlbumImg5}
            albumName='Hand to Earth'
            albumAuthor='Australian Art Orchestra'
          />
          <Album 
            albumImage={AlbumImg6}
            albumName='Malcolm Jiyane Tree-O'
            albumAuthor='Nahawa Doumbia'
          />
          <Album 
            albumImage={AlbumImg7}
            albumName='Indian Talking Machine'
            albumAuthor='Various Artists'
          />
          <Album 
            albumImage={AlbumImg8}
            albumName='This Pale'
            albumAuthor='Shujaat Khan & Katayoun Goudarzi'
          />
          <Album 
            albumImage={AlbumImg9}
            albumName='Umdali'
            albumAuthor='Malcolm Jiyane Tree-O'
          />         
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default Layout