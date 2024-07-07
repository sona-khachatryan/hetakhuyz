import { useEffect, useState } from "react"
import WatchClip from "../homepage/watch/watchclip/WatchClip"
import "./livestream.style.scss"
import LiveStreamSlice from "./livestreamslice/LiveStreamSlice"
import axios from "axios"
import { NavLink, useParams } from "react-router-dom"
import { address } from "../../repetitiveVariables/variables"
import MetaDecorator from "../metaDecorator/MetaDecorator.jsx";

const LiveStream = () => {
    
    const [quantity,setQuantity] = useState(5)
    const [manyViewsQuantity,setManyViewsQuantity] = useState(1)
    const [dataWatch,setDataWatch] = useState([])
    const [dataLives,setDataLives] = useState([])
    const {id} = useParams()

    const [facebookShareLink, setFacebookShareLink] = useState();
    const [twitterShareLink, setTwitterShareLink] = useState();
    const [shareLink, setShareLink] = useState();
    const [linkCopied, setLinkCopied] = useState(false);

    useEffect(()=>{
      (async () => {
        try {
          const {data}= await axios.get(`${address}/news/getAll`)
          const lives = await axios.get(`${address}/live/getAll`)
          Array.isArray(lives.data) && setDataLives(lives.data)
          Array.isArray(data) && setDataWatch(data.filter((data)=>!data.newsContent.file.isImage && data))
            setShareLink(`https://hetakhuyz.am/live/${id || ''}`);
            setFacebookShareLink(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://hetakhuyz.am/live/${id || ''}`)}`);
            setTwitterShareLink(`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://hetakhuyz.am/live/${id || ''}`)}`);

        } catch (error) {
          console.log(error)
        }
      })()
    },[id]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink).then(() => {

        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    useEffect(()=>{
    if(window.innerWidth>1032 && window.innerWidth<=1278 ){
        setManyViewsQuantity(2)
        }
        if(window.innerWidth<=1032){
          setQuantity(2)
        }
      },[])
      
  
  return (
      <>
          <MetaDecorator title={id ? dataLives.find(live => +live.id === +id)?.title : dataLives[0]?.title}/>
          <main className="live_stream_container">
              {<iframe src={id ? dataLives.find(live => +live.id === +id)?.url : dataLives[0]?.url} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                       referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
              <div>
                  <h3>{id ? dataLives.find(live => +live.id === +id)?.title : dataLives[0]?.title}</h3>
                  <ul>
                      <li>
                          <a href={facebookShareLink} target="_blank" rel="noopener noreferrer">
                              <img src="/img/facebook.svg" alt="Facebook"/>
                          </a>
                      </li>
                      <li>
                          <a href={twitterShareLink} target="_blank" rel="noopener noreferrer">
                              <img src="/img/twitter.svg" alt="Twitter"/>
                          </a>
                      </li>
                      <li onClick={handleCopyLink} onMouseDown={() => setLinkCopied(true)}
                          onMouseUp={() => setLinkCopied(false)}>
                          <img src="/img/link.svg" alt="Link" className={linkCopied ? 'linkCopied' : ''}/>
                      </li>
                  </ul>
              </div>
              <div className="live_streams_additional">
                  <h2>Լրացուցիչ ուղիղ եթերներ</h2>
                  <div>
                      {Array.isArray(dataLives) && dataLives.map(({url, title, id}, key) => {
                          if (quantity < key) return
                          return <NavLink key={key} to={"/live/" + id}><LiveStreamSlice url={url} title={title}/></NavLink>
                      })}
                  </div>
              </div>
              <div className="aside_btn">
                  <button onClick={() => {
                      setQuantity(quantity + 3)
                  }}>Տեսնել բոլորը
                  </button>
              </div>
              <div className="many_views_container">
                  <h2>Շատ դիտվածներ</h2>
                  <div>
                      {Array.isArray(dataWatch) && dataWatch.map((data,key)=>{
                          if(manyViewsQuantity<key)return
                          return <NavLink to={`/news/${data?.id}`} key={key}><WatchClip  data={data}/></NavLink>
                      })}
                  </div>
                  <div className="aside_btn many_views_btn" >
                      <button  onClick={()=>{setManyViewsQuantity(manyViewsQuantity+3)}}>Տեսնել բոլորը</button>
                  </div>
              </div>
          </main>
      </>
  )
}

export default LiveStream