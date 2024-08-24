import { useState } from "react";
import {  Link } from "react-router-dom";
function Sidebar() {
  const [flag,setFlag]=useState(1)
  return (
    <>
            <div className="all">
              <h4 className="heading">Library</h4>
              <ul className="list">
                <li className={flag==1 ?"active" :""} onClick={()=>setFlag(1)} >
                  <Link to="/">
                  Browse
                  </Link>
                </li>
                <li className={flag==2 ?"active" :""} onClick={()=>setFlag(2)} >
                  <Link to="/artist">
                Artist
                </Link>
                </li >
                <li className={flag==3 ?"active" :""} onClick={()=>setFlag(3)} >Album</li>
              </ul>
            </div>
            <div className="my">
              <h4 className="heading">My music</h4>
              <ul className={"list"}>
                <li className={flag==4 ?"active" :""} onClick={()=>setFlag(4)}><Link to="/recent" state={{data:"yu",option:2}}>Recently Played</Link></li>
                <li className={flag==5 ?"active" :""} onClick={()=>setFlag(5)} >My playlist</li>
                <li className={flag==6 ?"active" :""} onClick={()=>setFlag(6)} >Profile</li>
              </ul>
            </div>
    </>
  )
}

export default Sidebar
