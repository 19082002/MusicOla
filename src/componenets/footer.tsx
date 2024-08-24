import {
  House,
  Search,
  CircleUser,
  ChartNoAxesColumn,
} from "lucide-react";
import {  Link } from "react-router-dom";
import "../css/footer.css"
import { useState } from "react";
function Footer() {
  const [flag,setFlag]=useState(1)
  return (
    <>
            <div className="all">
            <ul className="list">
              <li className={flag==1 ?"active" :""} onClick={()=>setFlag(1)}>
              <Link to="/">
                <span>
                    <House className="icon" />
                  Home
                </span>
                </Link>
              </li>
              <li className={flag==2 ?"active" :""} onClick={()=>setFlag(2)}>
              <Link to="/search">
                <span>
                    <Search className="icon" />
                  Search
                </span> </Link>
              </li>
              <li className={flag==3 ?"active" :""} onClick={()=>setFlag(3)}>
              <Link to="/artist">
                <span>
                  <ChartNoAxesColumn className="icon" />
                  Artists
                </span>
                
                </Link>
              </li>
              <li className={flag==4 ?"active" :""} onClick={()=>setFlag(4)}>
                <span>
                  <CircleUser className="icon" /> User
                </span>
              </li>
            </ul>
          </div>
          
    </>
  )
}

export default Footer
