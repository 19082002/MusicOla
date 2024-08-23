import Top from "./top.tsx";
import Playcom from "./play.tsx";
import "../css/navbar.css";
import Footer from "./footer.tsx";
import Sidebar from "./sidebar.tsx";
import Music from "./music.tsx";
import { Outlet } from "react-router-dom";
function Navbar() {
  const size = window.innerWidth;
  return (
    <>
      {/* <div >
      fryetgjdskheku
    </div> */}
      <div className="nav">
        {size > 450 ? (
          <div className="navbar">
            <div className="title">
              <h3>MusicOla</h3>
            </div>
            <Sidebar />
          </div>
        ) : (
          <div className="phone">
            <Footer />
          </div>
        )}
        <div className="topcontainer">
          <Top />
        </div>
        <div className="musiccc">
          {size >= 900 && <Music />}
          </div>
        <div className="playy">
          <Playcom />
        </div>
      </div>

      {/* dgyustyihdskue */}
      <Outlet />
    </>
  );
}

export default Navbar;
