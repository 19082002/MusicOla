
import {  Link, Outlet } from "react-router-dom";
import "../css/all.css"
import { DotIcon, Play } from "lucide-react";
// import { useEffect, useState } from "react";

function All() {
  // const mykey=import.meta.env.VITE_API_KEY;
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   type requesttype={
  //     method: string,
  //     headers: unknown,
  //     redirect: string,
  //   }
  //   const requestOptions: requesttype = {
  //     method: "get",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };
    // type rlsdatatype = {
    //   name: string;
    //   images: {
    //     height: number;
    //     url: string;
    //     width: number;
    //   }[];
    // };
    // type artisttype = {
    //   name: string;
    //   popularity: number;
    // };
    // const [flag, setFlag] = useState(false);
    // const [data, setData] = useState<rlsdatatype[]>([]);
    // const [artist, setArtist] = useState<artisttype[]>([]);
    // const [name, setName] = useState<string>("");
    // async function getResponse(name: string) {
    //   const response1 = await fetch(
    //     `https://v1.nocodeapi.com/bristi/spotify/${mykey}/browse/new`,
    //     requestOptions
    //   );
    //   const response2 = await fetch(
    //     `https://v1.nocodeapi.com/bristi/spotify/${mykey}/search?q=${name}&type=track`,
    //     requestOptions
    //   );
    //   const data1 = await response1.json();
    //   const data2 = await response2.json();
    //   return [data1.albums.items, data2.tracks.items];
    // }
    // tracks.items  .name .popularity
    // useEffect(() => {
    // getResponse(name).then((e) =>{setData(e[0]); setArtist(e[1])}).then(() =>setFlag(true))
    // }, [])

  return (
    <>
                <div className="allcontainer custom">
            <div className="newrelease">
              <div className="heading">
              <h3>New Release</h3>
              
              </div>
              <div className="card">
                {
                // flag ? (
                //   data.map((element) => {
                //     return (
                //       <div className="one">
                //         <img src={element.images[0].url} />
                //         <div className="intro">
                //           <h1>{element.name}</h1>
                //         </div>
                //       </div>
                //     );
                //   })
                // ) : (
                //   <>loading</>
                // )
                }
                <div className="one">
                  <img src="./images/jeet.jpg" />
                  <div className="intro">
                    <h1>my name</h1>
                  </div>
                </div>
                <div className="one">
                  <img src="./images/jeet.jpg" />
                  <div className="intro">
                    <h1>my name</h1>
                  </div>
                </div>
                <div className="one">
                  <img src="./images/jeet.jpg" />
                  <div className="intro">
                    <h1>my name</h1>
                  </div>
                </div>
                <div className="one">
                  <img src="./images/jeet.jpg" />
                  <div className="intro">
                    <h1>my name</h1>
                  </div>
                </div>
                <div className="one">
                  <img src="./images/jeet.jpg" />
                  <div className="intro">
                    <h1>my name</h1>
                  </div>
                </div>
                <div className="one">
                  <img src="./images/jeet.jpg" />
                  <div className="intro">
                    <h1>my name</h1>
                  </div>
                </div>
                <div className="one">
                  <img src="./images/jeet.jpg" />
                  <div className="intro">
                    <h1>my name</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="popularartist">
            <div className="heading">
            <h3>Popular Artist</h3>
              <Link to="/artist" >
              <p className="author">See All</p></Link>
              </div>
              <div className="card">
              {
              // flag ? (
              //   artist.map((element: artisttype) => {
              //     return (
              //       <>
              //       <div className="image">
              //         <p>{element.name}</p>
              //         <p>{element.popularity} </p>
              //         </div>
              //       </>
              //     );
              //   })
              // ) : (
              //   <>loading</>
              // )
              }

                <div className="image">
                <img src="./images/jeet.jpg" />
                <p>Jeet Ganguly</p>
                </div>
                <div className="image">
                <img src="./images/jeet.jpg" />
                <p>Jeet Ganguly</p>
                </div>
                <div className="image">
                <img src="./images/jeet.jpg" />
                <p>Jeet Ganguly</p>
                </div>
                <div className="image">
                <img src="./images/jeet.jpg" />
                <p>Jeet Ganguly</p>
                </div>
                <div className="image">
                <img src="./images/jeet.jpg" />
                <p>Jeet Ganguly</p>
                </div>
                <div className="image">
                <img src="./images/jeet.jpg" />
                <p>Jeet Ganguly</p>
                </div>
                <div className="image">
                <img src="./images/jeet.jpg" />
                <p>Jeet Ganguly</p>
                </div>
                <div className="image">
                <img src="./images/jeet.jpg" />
                <p>Jeet Ganguly</p>
                </div>
                <div className="image">
                <img src="./images/jeet.jpg" />
                <p>Jeet Ganguly</p>
                </div>
                <div className="image">
                <img src="./images/jeet.jpg" />
                <p>Jeet Ganguly</p>
                </div>
              </div>
            </div>
            <div className="recent">
            <div className="heading">
              <h3>Recently Played</h3>
              <Link to="/recent" state={{data:"yu",option:2}}><p className="author">See All</p></Link>
              </div>
              <div className="playedcard">
                <img src="./images/ply.jpg" />
                <h4>Coffe House er sei</h4>
                <p className="releaseDate">23jan 2023</p>
                <div className="icon">
                  <Play/>
                  <DotIcon />
                </div>
              </div>
              <div className="playedcard">
                <img src="./images/ply.jpg" />
                <h4>Coffe House er sei</h4>
                <p className="releaseDate">23jan 2023</p>
                <div className="icon">
                  <Play />
                  <DotIcon />
                </div>
              </div>
            </div>         
          </div>
          <Outlet/>
    </>
  )
}

export default All
