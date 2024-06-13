import { Link } from "react-router-dom"
import "./watch.style.scss"
import WatchClip from "./watchclip/WatchClip"
import axios from "axios"
import { useEffect , useState} from "react"
import { address } from "../../../repetitiveVariables/variables"
const Watch = () => {
    const [dataWatch,setDataWatch] = useState([])
  
    useEffect(()=>{
      (async () => {
        try {
          const {data}= await axios.get(`${address}/news/getAll`)
          Array.isArray(data) && setDataWatch(data.filter((data)=>!data.newsContent.file.isImage && data))
        } catch (error) {
          console.log(error)
        }
      })()
    },[])
    
  return (
    <section className="watch_container">
      <h2>Դիտել</h2>
        <div className="watch_clip">
          {Array.isArray(dataWatch) && dataWatch.map((data,key)=>{
            if(key>=2)return
            return <Link key={key} to={"videos/"+data.id}><WatchClip data={data && data}/></Link>    
            })}            
        </div>    
    </section>
  )
}

export default Watch