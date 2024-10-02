import { Link, Outlet } from "react-router-dom";
import "../css/all.css";
import { DotIcon, Play } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { useAudioPlayerContext } from "./audioplay";
// import { useEffect, useState } from "react";

function All() {
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
  type rlsdatatype = {
    name: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
  };
  type artisttype = {
    name: string;
    popularity: number;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
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
  type recentType = {
    track: tracktype;
  };
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);
  const [data1, setData1] = useState<rlsdatatype[]>([]);
  const [data2, setData2] = useState<artisttype[]>([]);
  const [data3, setData3] = useState<recentType[]>([]);
  async function getResponse() {
    await fetch(
      `https://v1.nocodeapi.com/${user}/spotify/${mykey}/browse/new`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setData1(result.albums.items))
      .then(() => setFlag1(true))
      .then(() => console.log("fetch1"));
    await fetch(
      `https://v1.nocodeapi.com/${user}/spotify/${mykey}/usersTop?type=artists&perPage=10`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setData2(result.items))
      .then(() => setFlag2(true))
      .then(() => console.log("fetch2"));
    await fetch(
      `https://v1.nocodeapi.com/${user}/spotify/${mykey}/recentlyPlayed?limit=10`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {setData3(result.items);
        setCurrentTrack({
          title: result.items[0].track.name,
          src: result.items[0].track.preview_url,
          thumbnail: result.items[0].track.album.images[0].url,
        })    
      })
      .then(() => setFlag3(true))
      .then(() => console.log("fetch3"));
    console.log("all");
  }
  // tracks.items  .name .popularity
  // useEffect(() => {
  // getResponse(name).then((e) =>{setData(e[0]); setArtist(e[1])}).then(() =>setFlag(true))
  // }, [])
  useEffect(() => {
    getResponse();
  }, []);
  const updatemusic = (url: string, name: string, image: string) => {
    // setIsPlaying(false)
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

  return (
    <>
      <div className="allcontainer custom">
        <div className="newrelease">
          <div className="heading">
            <h3>New Release</h3>
          </div>
          <div className="card">
            {flag1 ? (
              data1.map((element) => {
                return (
                  <div className="one">
                    <img src={element.images[0].url} />
                    <div className="intro">
                      <h1>{element.name}</h1>
                    </div>
                  </div>
                );
              })
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div className="popularartist">
          <div className="heading">
            <h3>Popular Artist</h3>
            <Link to="/artist">
              <p className="author">See All</p>
            </Link>
          </div>
          <div className="card">
            {flag2 ? (
              data2.map((element: artisttype) => {
                return (
                  <>
                    <Link
                      to="/playlist"
                      state={{ data: element.name, option: 1 }}
                    >
                      <div className="image">
                        <img src={element.images[0].url} />
                        <p>{element.name}</p>
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
        <div className="recent">
          <div className="heading">
            <h3>Recently Played</h3>
            <Link to="/recent" state={{ data: "yu", option: 2 }}>
              <p className="author">See All</p>
            </Link>
          </div>
          {flag3 ? (
            data3.map((element) => {
              currentTracks.push({
                title: element.track.name,
                src: element.track.preview_url,
                thumbnail: element.track.album.images[0].url,
              });
              setCurrentTracks(currentTracks);
              return (
                <div
                  className="playedcard"
                  onClick={() =>
                    updatemusic(
                      element.track.preview_url,
                      element.track.name,
                      element.track.album.images[0].url
                    )
                  }
                >
                  <img src={element.track.album.images[0].url} />
                  <h4>{element.track.name}</h4>
                  <p className="releaseDate">
                    {element.track.album.release_date}
                  </p>
                  <div className="icon">
                    <Play />
                    <DotIcon />
                  </div>
                </div>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default All;
