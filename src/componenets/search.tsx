import {  Search} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/search.css"
function Searchcom(){
  const [name,setName]=useState<string>("yu")


  // data[0].album.images[0].url  data[0].name  data[0].preview_url

  return (
    <>
    <div className="searchbox">
             <input
              type="text"
              placeholder="Search by artists songs or albums"
              className="search"
              onChange={(e)=>setName(e.target.value)}
            />
            <label>
              <Link to="/recent" state={{data:name,option:1}}>
              <Search style={{ width: "18px" }}  />
              </Link>
            </label>
            </div>
            {/* <div >
              <div className="open">
              <label>
                <Search />
              </label>
              <input
                type="text"
                placeholder="Search by artists songs or albums"
                className="search"
              />
              </div>
              <div className="close">
              <CrossIcon/>
              </div>
            </div> */}
    </>
  )
}

export default Searchcom
