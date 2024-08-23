import { BellDot } from "lucide-react";
import Searchcom from "./search.tsx"
import "../css/top.css";
import { Link } from "react-router-dom";
function Top() {
  const size = window.innerWidth;
  return (
    <>
      {size > 450 ? (
        <div className="top">
          <div className="searchbox">
           <Searchcom/>
          </div>
          <div className="avatar">
            <BellDot style={{ width: "18px" }} />
            <img src="./images/avatar.jpg" className="image" />
          </div>
        </div>
      ) : (
        <div className="phone">
          <div className="title">
            <h3>MusicOla</h3>
          </div>
          <div className="top">
            <div className="avatar">
              <BellDot />
              <img src="./images/avatar.jpg" className="image" />
            </div>
          </div>
          <div className="my">
            <div className="column active">
            <Link to="/recent">
              All
              </Link>
              </div>
            <div className="column">Playlist</div>
            <div className="column">
            <Link to="/recent" state={{data:"yu",option:2}}>
              Recently Played
              </Link>
              </div>
            <div className="column">Albums</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Top;
