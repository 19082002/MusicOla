import { useEffect, useState } from "react";
import "../css/playlistcontainer.css";
import { Link, useLocation } from "react-router-dom";
import "../css/playlistcontainer.css";
import { DotIcon, Play, MoveLeft } from "lucide-react";
import Loading from "./loading";
import { useAudioPlayerContext } from "./audioplay";
import Playcom from "./play.tsx";
function Playlistcontainer() {
  const mykey = import.meta.env.VITE_API_KEY;
  const user = "sunenjoy";
  const {
    setIndex,
    currentTracks,
    setCurrentTracks,
    setCurrentTrack,
    setIsPlaying,
    setTimeProgress,
  } = useAudioPlayerContext();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions: RequestInit = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",
  };
  type tracktype = {
    preview_url: string;
    name: string;
    album: {
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      release_date: string;
    };
  };
  async function listResponse(nam: string) {
    await fetch(
      `https://v1.nocodeapi.com/${user}/spotify/${mykey}/search?q=${nam}&type=track`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setData(result.tracks.items))
      .then(() => setFlag(true))
      .then(() => console.log("song list in playlist"));
    // console.log(nam)
  }
  const [data, setData] = useState<tracktype[]>([]);
  const [flag, setFlag] = useState(false);
  const location = useLocation();
  const props = location.state;
  useEffect(() => {
    listResponse(props.data);
  }, []);
  const updatemusic = (url: string, name: string, image: string) => {
    setCurrentTrack({
      title: name,
      src: url,
      thumbnail: image,
    });
    setTimeProgress(0);
    setIsPlaying(true);
    const i = currentTracks.findIndex((obj) => {
      return obj.src == url;
    });
    setIndex(i);
    console.log(3);
  };
  // const url=size<900?"/music":""
  return (
    <>
      <div className="listcontainer">
        <div className="albumimage">
          <Link to="/">
            <MoveLeft className="lefticon" />
          </Link>
          <img src={props.img} alt="yui" />
        </div>
        <div className="card">
          {flag ? (
            data.map((e) => {
              currentTracks.push({
                title: e.name,
                src: e.preview_url,
                thumbnail: e.album.images[0].url,
              });
              setCurrentTracks(currentTracks);
              return (
                <>
                  <div className="playedcard">
                    <img src={e.album.images[0].url} />
                    <h4>{e.name}</h4>
                    <p className="releaseDate">{e.album.release_date}</p>
                    <div className="icon">
                      {/* <Link to={`${url}`}> */}
                      <Play
                        onClick={() =>
                          updatemusic(
                            e.preview_url,
                            e.name,
                            e.album.images[0].url
                          )
                        }
                      />
                      <DotIcon />
                      {/* </Link> */}
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <div className="playy">
        <Playcom />
      </div>
    </>
  );
}

export default Playlistcontainer;
