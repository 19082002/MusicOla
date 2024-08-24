import { BellDot } from "lucide-react";
import Searchcom from "./search.tsx"
import "../css/top.css";
import { Link } from "react-router-dom";
import { useState } from "react";
function Top() {
  const size = window.innerWidth;
  const [flag,setFlag]=useState(1)
  return (
    <>
      {size > 450 ? (
        <div className="top">

           <Searchcom/>
          {/* </div> */}
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
            <div className={"column "+ (flag==1 ? "active" :"")} onClick={()=>setFlag(1)}>
            <Link to="/">
              All
              </Link>
              </div>
            <div className={"column "+ (flag==2 ? "active" :"")} onClick={()=>setFlag(2)}>Playlist</div>
            <div className={"column "+ (flag==3 ? "active" :"")} onClick={()=>setFlag(3)}>
            <Link to="/recent" state={{data:"yu",option:2}}>
              Recently Played
              </Link>
              </div>
            <div className={"column "+ (flag==4 ? "active" :"")} onClick={()=>setFlag(4)}>Albums</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Top;
