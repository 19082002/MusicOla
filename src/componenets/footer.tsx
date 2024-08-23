import {
  House,
  Search,
  CircleUser,
  ChartNoAxesColumn,
} from "lucide-react";
import {  Link } from "react-router-dom";
import "../css/footer.css"
function Footer() {
  return (
    <>
            <div className="all">
            <ul className="list">
              <li className="active">
              <Link to="/">
                <span>
                    <House className="icon" />
                  Home
                </span>
                </Link>
              </li>
              <li>
              <Link to="/search">
                <span>
                    <Search className="icon" />
                  Search
                </span> </Link>
              </li>
              <li>
              <Link to="/artist">
                <span>
                  <ChartNoAxesColumn className="icon" />
                  Artists
                </span>
                
                </Link>
              </li>
              <li>
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
