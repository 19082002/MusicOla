import { useEffect, useState } from "react";
import "../css/artist.css";
import { Link } from "react-router-dom";
import Loading from "./loading";
function Artist() {
  const mykey = import.meta.env.VITE_API_KEY;
  const user = "sunenjoy";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions: RequestInit = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",
  };
  type artisttype = {
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
  };
  const [data, setData] = useState<artisttype[]>([]);
  const [flag, setFlag] = useState(false);
  async function artist() {
    await fetch(
      `https://v1.nocodeapi.com/${user}/spotify/${mykey}/usersTop?type=artists`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setData(result.items))
      .then(() => setFlag(true))
      .then(() => console.log("artist"));
    console.log("artist");
  }
  useEffect(() => {
    artist();
  }, []);
  return (
    <>
      <div className="artistcontainer custom">
        <div className="card">
          {flag ? (
            data.map((e: artisttype) => {
              return (
                <>
                  <Link to="/playlist" state={{ data: e.name, option: 1 }}>
                    <div className="image">
                      <img src={e.images[0].url} />
                      <h1>{e.name}</h1>
                    </div>
                  </Link>
                </>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}

export default Artist;
