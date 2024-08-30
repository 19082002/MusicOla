import { useEffect, useState } from "react";
import "../css/playlist.css";

import { Link, useLocation } from "react-router-dom";
import Loading from "./loading";
function Playlist() {
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
    description: string;
    name: string;
    popularity: number;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    owner: { display_name: string };
  };
  async function artistplaylist(nam: string) {
    console.log(nam);
    await fetch(
      `https://v1.nocodeapi.com/${user}/spotify/${mykey}/search?q=${nam}&type=playlist `,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setData(result.playlists.items))
      .then(() => setFlag(true))
      .then(() => console.log("artistplaylist"));
  }
  // async function myplaylist(){
  // const response=await fetch(
  //   `https://v1.nocodeapi.com/${user}/spotify/${mykey}/myPlaylists`,
  //   requestOptions
  // ).then((response)=>response.json()).then((result)=>setData(result.playlist.items))
  // .then(()=>setFlag(true)).then(()=>console.log("my playlist"));
  // console.log("playlist")
  // }
  const [data, setData] = useState<artisttype[]>([]);
  const [flag, setFlag] = useState(false);
  const location = useLocation();
  const props = location.state;
  useEffect(() => {
    artistplaylist(props.data);
  }, []);
  return (
    <>
      <div className="playlistcontainer custom">
        <div className="card">
          {flag ? (
            data.map((e: artisttype) => {
              return (
                <Link
                  to="/list"
                  state={{ data: `${e.name}`, img: `${e.images[0].url}` }}
                >
                  <div className="image">
                    <img src={e.images[0].url} />
                    <h3>{e.owner.display_name}</h3>
                  </div>
                </Link>
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

export default Playlist;
