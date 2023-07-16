import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Blog from './pages/Blog/Blog';
import Library from './pages/Library/Library';
import './App.css';
import Layout from './hoc/Layout';


const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Library />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
