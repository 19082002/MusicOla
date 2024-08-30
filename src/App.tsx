import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './componenets/navbar'
import Searchcom from './componenets/search';
import  Music  from './componenets/music';
import Artist from './componenets/artist'
import All from './componenets/all';
import RecentPlayed from './componenets/recentPlayed'
import Playlist from "./componenets/playlist";
import Playlistcontainer from "./componenets/playlistcontainer";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes> 
          <Route path="/" element={<Navbar/>}>
          <Route index element={<All/>}/>
          <Route path="artist" element={<Artist/>} />
          <Route path="playlist" element={<Playlist/>}/>
          <Route path="recent" element={<RecentPlayed/>} />
          </Route>
          <Route path="music" element={<Music/>} />
          <Route path="search" element={<Searchcom/>} />
          <Route path="list" element={<Playlistcontainer/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
