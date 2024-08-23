import {  Link } from "react-router-dom";
function Sidebar() {
  return (
    <>
            <div className="all">
              <h4 className="heading">Library</h4>
              <ul className="list">
                <li className="active" >
                  <Link to="/">
                  Browse
                  </Link>
                </li>
                <li>
                  <Link to="/artist">
                Artist
                </Link>
                </li>
                <li>Album</li>
              </ul>
            </div>
            <div className="my">
              <h4 className="heading">My music</h4>
              <ul className={"list"}>
                <li><Link to="/recent" state={{data:"yu",option:2}}>Recently Played</Link></li>
                <li>My playlist</li>
                <li>Profile</li>
              </ul>
            </div>
    </>
  )
}

export default Sidebar
