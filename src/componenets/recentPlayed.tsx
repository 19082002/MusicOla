
import { useLocation } from "react-router-dom"
import "../css/recent.css"
import { useEffect, useState } from "react";
import { useAudioPlayerContext } from "./audioplay";
function RecentPlayed() {
  const{setCurrentTrack,currentTrack,isPlaying,setIsPlaying}=useAudioPlayerContext();
  const mykey=import.meta.env.VITE_API_KEY;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions: any = {
      method: "get",
      headers: myHeaders,
      redirect: "follow",
    };
    type tracktype = {
      preview_url:string;
      name: string;
      album:{images: {
        height: number;
        url: string;
        width: number;
      }[]};
    };
    type recenttype={
      track:{
        name: string;
        album:{images: {
          height: number;
          url: string;
          width: number;
        }[]};
        preview_url:string;
      };
    }
    async function trackResponse(nam:string) {
      // const response2 = await fetch(
      //   `https://v1.nocodeapi.com/bristi/spotify/MwEmUsCFfwFSAosj/search?q=${nam}&type=track`,
      //   requestOptions
      // )
      // const data2 =await response2.json();
      // setData(data2.tracks.items)
      // console.log(data2.tracks.items)
      // return data2.tracks.items;
      console.log(1)
    }
    async function recently(){
      // const response=await fetch(
      //   `https://v1.nocodeapi.com/userrest/spotify/tsNHGtPnhcJiBgMj/recentlyPlayed?limit=50`
      // )
      // const result=await response.json();
      // setData(result.items)
      console.log(mykey)
    }
  const [data,setData]=useState<recenttype[] | tracktype[]>([])
  const location = useLocation()
  const props=location.state
  useEffect(() => {
    if(props.option==1)trackResponse(props.data)
      if(props.option==2)recently()
  }, [props])

  const updatemusic=(url:string)=>{
    setCurrentTrack({
      title:"props",
      src:url,
      author:"piu",
      thumbnail:"./images/artist.jpg"
    })
    setIsPlaying(true);
console.log(3)
}
  return (
    <>
    {/* {data[0] && */}
            <div className="recentc custom">
              {/* <h3>Recently Played</h3> */}
              <div className="card" >
              {/* <div className="playedcard">
                <img src={data[0].track.album.images[0].url} />
                <div className="intro">
                <h4>{data[0].track.name}</h4>
                <p className="releaseDate">23jan 2023</p>
                </div>
              </div> */}
              <div className="playedcard" onClick={()=>updatemusic('../src/b.mp3')}>
                <img src="./images/ply.jpg" />
                <div className="intro">
                <h4>Coffe House er sei</h4>
                <p className="releaseDate">23jan 2023</p>
                </div>
              </div>
              <div className="playedcard">
                <img src="./images/ply.jpg" />
                <div className="intro">
                <h4>Coffe House er sei</h4>
                <p className="releaseDate">23jan 2023</p>
                </div>
              </div>
              <div className="playedcard">
                <img src="./images/ply.jpg" />
                <div className="intro">
                <h4>Coffe House er sei</h4>
                <p className="releaseDate">23jan 2023</p>
                </div>
              </div>
              {/* <div className="playedcard">
              <img src={data[19].track.album.images[0].url} />
                <div className="intro">
                <h4>{data[19].track.name}</h4>
                <p className="releaseDate">23jan 2023</p>
                </div>
              </div> */}
              </div>

            </div>
{/* } */}
    </>
  )
}

export default RecentPlayed
