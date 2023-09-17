import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Blog from './pages/Blog/Blog';
import Library from './pages/Library/Library';
import Post from './pages/Post/Post';
import Map from './pages/Map/Map'

console.log(process.env)

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Library />} />
          <Route path="/library" element={<Library />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/map" element={<Map />} />
          <Route path="/post/:postId" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
