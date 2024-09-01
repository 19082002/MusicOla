import "../css/album.css"
import { Link } from 'react-router-dom';
import Loading from './loading';
import { useEffect, useState } from "react";

function Album() {
    const mykey = import.meta.env.VITE_API_KEY;
    const user = "sunenjoy";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions: RequestInit = {
      method: "get",
      headers: myHeaders,
      redirect: "follow",
    };
    type categorytype={
        id:string;
        icons:{
            height:number
            url:string
            width:number
        }[]
        name:string
    }
      async function category(){
await fetch(
    `https://v1.nocodeapi.com/${user}/spotify/${mykey}/browse/categories`,
    requestOptions
  ).then((response)=>response.json()).then((result)=>setData(result.categories.items))
  .then(()=>setFlag(true)).then(()=>console.log("my playlist"));
  console.log("album")
  }
  useEffect(() => {
  category()
  }, [])
  const [data, setData] = useState<categorytype[]>([]);
  const [flag, setFlag] = useState(false);
  return (
    <div className="albumcontainer custom">
    <div className="card">
      {flag ? (
        data.map((e) => {
          return (
            <Link
              to="/playlist"
              state={{ data: `${e.id}`, option:2 }}
            >
              <div className="image">
                <img src={e.icons[0].url} />
                <h3>{e.name}</h3>
              </div>
            </Link>
          );
        })
      ) : (
        <Loading />
      )}
      {/* <div className="image">
        <img src="./images/jeet.jpg" alt="" />
        <h3>jeet</h3>
      </div>
      <div className="image">
        <img src="./images/jeet.jpg" alt="" />
        <h3>jeet</h3>
      </div>
      <div className="image">
        <img src="./images/jeet.jpg" alt="" />
        <h3>jeet</h3>
      </div>
      <div className="image">
        <img src="./images/jeet.jpg" alt="" />
        <h3>jeet</h3>
      </div> */}
    </div>
  </div>
  )
}

export default Album
