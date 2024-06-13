import { useEffect, useState } from "react"
import WatchClip from "../homepage/watch/watchclip/WatchClip"
import "./livestream.style.scss"
import LiveStreamSlice from "./livestreamslice/LiveStreamSlice"
import axios from "axios"
import { NavLink, useParams } from "react-router-dom"
import { address } from "../../repetitiveVariables/variables"

const LiveStream = () => {
    
    const [quantity,setQuantity] = useState(5)
    const [manyViewsQuantity,setManyViewsQuantity] = useState(1)
    const [dataWatch,setDataWatch] = useState([])
    const [dataLives,setDataLives] = useState([])
    const {id} = useParams()
    
    useEffect(()=>{
      (async () => {
        try {
          const {data}= await axios.get(`${address}/news/getAll`)
          const lives = await axios.get(`${address}/live/getAll`)
          Array.isArray(lives.data) && setDataLives(lives.data)
          Array.isArray(data) && setDataWatch(data.filter((data)=>!data.newsContent.file.isImage && data))
        } catch (error) {
          console.log(error)
        }
      })()
    },[])



    useEffect(()=>{
    if(window.innerWidth>1032 && window.innerWidth<=1278 ){
        setManyViewsQuantity(2)
        }
        if(window.innerWidth<=1032){
          setQuantity(2)
        }
      },[])
      
  
  return (
    <main className="live_stream_container">
      {
        dataLives && <iframe src={dataLives && dataLives[id || 0]?.url} ></iframe>
      }
        <div>
            <h3>24/7 ուղիղ եթերներ Լոռեմ կայքից</h3>
            <ul>
                <li><img src="./img/Group.png" /></li>
                <li><img src="./img/Group1.png" /></li>
                <li><img src="./img/Group2.png" /></li>
                <li><img src="./img/Group3.png" /></li>
            </ul>
        </div>
        <div className="live_streams_additional">
            <h2>Լրացուցիչ ուղիղ եթերներ</h2>
            <div>
                {Array.isArray(dataLives) && dataLives.map(({url,title,id},key)=>{
                    if(quantity<key) return
                    return <NavLink key={key} to={"/live/"+id}><LiveStreamSlice url={url} title={title} /></NavLink>
                })}
            </div>
        </div>
            <div className="aside_btn">
          <button  onClick={()=>{setQuantity(quantity+3)}}>Տեսնել բոլորը</button>    
        </div> 
        <div className="many_views_container">
            <h2>Շատ դիտվածներ</h2>
            <div>
               {Array.isArray(dataWatch) && dataWatch.map((data,key)=>{
                    if(manyViewsQuantity<key)return
                return <NavLink to={'/videos/'+data.id} key={key}><WatchClip  data={data}/></NavLink>
               })}
            </div>
            <div className="aside_btn many_views_btn" >
          <button  onClick={()=>{setManyViewsQuantity(manyViewsQuantity+3)}}>Տեսնել բոլորը</button>    
        </div> 
        </div>
    </main>
  )
}

export default LiveStream