import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/search.css";
function Searchcom() {
  const [name, setName] = useState<string>("yu");
  return (
    <>
      <div className="searchbox">
        <input
          type="text"
          placeholder="Search by Artists Songs or Albums"
          className="search"
          onChange={(e) => setName(e.target.value)}
        />
        <label>
          <Link to="/recent" state={{ data: name, option: 1 }}>
            <Search style={{ width: "18px" }} />
          </Link>
        </label>
      </div>
    </>
  );
}

export default Searchcom;
