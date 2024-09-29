import Loading from "./loading";
import { useLocation } from "react-router-dom";
import "../css/recent.css";
import { useEffect, useState } from "react";
import { useAudioPlayerContext } from "./audioplay";
function RecentPlayed() {
  const {
    setIndex,
    currentTracks,
    setCurrentTracks,
    setCurrentTrack,
    setIsPlaying,
    setTimeProgress,
  } = useAudioPlayerContext();
  const mykey = import.meta.env.VITE_API_KEY;
  const user = "sunenjoy";
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
    };
  };
  type recentType = {
    track: tracktype;
  };
  async function trackResponse(nam: string) {
    await fetch(
      `https://v1.nocodeapi.com/${user}/spotify/${mykey}/search?q=${nam}&type=track`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setData(result.tracks.items))
      .then(() => setFlag(true))
      .then(() => console.log("recentlytrack"));
    console.log(nam);
  }

  async function recently() {
    await fetch(
      `https://v1.nocodeapi.com/${user}/spotify/${mykey}/recentlyPlayed?limit=50`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setData(result.items))
      .then(() => setFlag(true))
      .then(() => console.log("recently"));
  }
  const [data, setData] = useState<(recentType | tracktype)[]>([]);
  const [flag, setFlag] = useState(false);
  const location = useLocation();
  const props = location.state;
  useEffect(() => {
    if (props.option == 1) trackResponse(props.data);
    if (props.option == 2) recently();
    setCurrentTracks([]);
  }, [props]);

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
      <div className="recentc custom">
        {/* <h3>Recently Played</h3> */}
        <div className="card">
          {flag ? (
            data.map((e: recentType | tracktype) => {
              let customimage: string = "";
              let customname: string = "";
              let customhref: string = "";
              if ((e as recentType).track) {
                customimage = (e as recentType).track.album.images[0].url;
                customname = (e as recentType).track.name;
                customhref = (e as recentType).track.preview_url;
              } else {
                customimage = (e as tracktype).album.images[0].url;
                customname = (e as tracktype).name;
                customhref = (e as tracktype).preview_url;
              }
              currentTracks.push({
                title: customname,
                src: customhref,

                thumbnail: customimage,
              });
              setCurrentTracks(currentTracks);
              return (
                <>
                  <div
                    className="playedcard"
                    onClick={() =>
                      updatemusic(customhref, customname, customimage)
                    }
                  >
                    <img src={customimage} />
                    <div className="intro">
                      <h4>{customname}</h4>
                      {/* <p className="releaseDate">23jan 2023</p> */}
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
    </>
  );
}

export default RecentPlayed;
