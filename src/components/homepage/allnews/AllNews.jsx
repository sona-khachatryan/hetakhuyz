import { useEffect,useState } from "react"
import "./allnews.style.scss"
import NewsContainer from "./newscontainer/NewsContainer"
import { Link, useLocation } from "react-router-dom"



const AllNews = ({title = "",data=[]}) => {
    const [quantity,setQuantity] = useState(5)
    const {pathname} = useLocation()

    useEffect(()=>{  
     if(window.innerWidth<=850){
        setQuantity(2)
     }
    },[])

    function handleChangeColor(){
      return pathname.includes("armenia")?"all_news_container_col_armenia":pathname.includes("region")?"all_news_container_col_region":pathname.includes("international")?"all_news_container_col_international":""
    }

  return (
    <section className="all_news_container">
        <h2 className={handleChangeColor()}>{title}</h2>
        <div>
            {Array.isArray(data) && data.map((data,key)=>{
                if(quantity<key) return
                return <Link key={key} to={"/news/"+data.id}><NewsContainer data={data && data}/></Link>
            })}
        </div>
        
        <div className="see_more">
          <button  onClick={()=>{setQuantity(quantity+3)}}>Տեսնել ավելին</button>    
        </div>    
    </section>
  )
}

export default AllNews