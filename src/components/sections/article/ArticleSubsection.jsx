import { Link , NavLink, useLocation} from "react-router-dom"
import "./article.style.scss"
import AsideSlice from "../asideslice/AsideSlice"
import { useRef,useEffect } from "react"

const ArticleSubsection = ({title,data,to=""}) => {
  const advisRef = useRef(null)
  const {pathname} = useLocation()

  useEffect(() => {
      if (window.location.hash.includes(to) ) {
        advisRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [])

  
  function handleAfterColor(){
    return pathname.includes("armenia")?"subsection_armenia":"subsection_region"
  }

  return (
    <div id={to} ref={advisRef} className="aside_container">
        <h2 className={handleAfterColor()}>{title}</h2>
        <div>
        {Array.isArray(data) && data.map((data,key)=>{
          if(key>2)return
            return <Link key={key} to={"/news/"+data.id}>
            <AsideSlice  data={data} />
            </Link>
        })}
        <div className="aside_button">
          <button><NavLink to={to}>Տեսնել բոլորը</NavLink></button>
        </div>
        </div>
        
    </div>
  )
}

export default ArticleSubsection