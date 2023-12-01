import React from 'react'
import './App.css'
import SimpleBottomNavigation from './components/MainNav'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Container, NativeSelect } from '@mui/material'
import Trending from './pages/Trending/Trending'
import Searchs from './pages/Searchs/Searchs'
import Series from './pages/Series/Series'
import Movies from './pages/Movies/Movies'
import Trailer from './pages/Trailer'
function App() {
  return (
    
    <BrowserRouter>
      <div className='app'>
        <div> 

     
        </div>
      <Container>
        <Routes>
          <Route path='/' element={<Trending/>} exact/>
          <Route path='/Movies' Component={Movies}/>
          <Route path='/Series' Component={Series}/>
          <Route path='/Searchs' Component={Searchs}/>
          <Route path='/Trailer' Component={Trailer}/>
        </Routes>
      </Container>
      </div>
      <SimpleBottomNavigation/>
    </BrowserRouter>
  )
}

export default App
