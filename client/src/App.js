import './App.css';
import {Container } from 'react-bootstrap';


import { Routes, Route ,Navigate } from 'react-router-dom';

import Navebar from './components/Nav/Navebar.js';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';

function App() {
  const user=JSON.parse(localStorage.getItem('profile'));
  
  return (

      <Container>
        <Navebar />
          <Routes>
            <Route path='/' exact element={<Navigate replace  to="/posts" />} ></Route>
            <Route path='/posts' exact element={<Home/>}  />
            <Route path='/posts/search' exact element={<Home/>}  />
            <Route path='/posts/:id' exact element={<PostDetails/>}  />
            <Route path='/creators/:name'exact element={<CreatorOrTag />} />
            <Route path='/tags/:name'exact element={<CreatorOrTag />} />
            {user?(<Route path='/auth' element={<Home/>}></Route>):<Route path='/auth' element={<Auth/>}></Route> }
          </Routes>
    </Container>
    
    
  );
}

export default App;
