import { useEffect, useState,useRef } from "react"
import AllNews from "../../homepage/allnews/AllNews"
import AsideSlice from "../asideslice/AsideSlice"
import './international.style.scss'
import { Link } from "react-router-dom"
import axios from "axios"
import { address } from "../../../repetitiveVariables/variables"

const International = () => {
  const [data,setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [contentBeginning,setContentBegining] = useState(0)
  const [contentQuantity,setContentQuantity] = useState(8)
  const containerRef = useRef(null)
  const maxPages = Math.ceil(data?.length/8)
    
  useEffect(()=>{
    (async () => {
      try {
        const {data}= await axios.get(`${address}/news/filter?countryId=6`)  
        setData(data.filter((data)=>data.newsContent.file.isImage))
      } catch (error) {
        console.log(error)
      }
    })()
  },[])


  function handleNextPage () {
      if(currentPage<maxPages){
        setCurrentPage(currentPage+1)
        setContentBegining(contentQuantity)
        setContentQuantity(contentQuantity+8)
        containerRef.current.scrollIntoView({behavior:"smooth"})
      }
    }
    
    function handlePrevPage (){
      if(currentPage>1){
        setCurrentPage(currentPage-1)
        setContentBegining(contentBeginning - 8)
        setContentQuantity(contentQuantity-8)
        containerRef.current.scrollIntoView({behavior:"smooth"})
      }
    }
    
    function handlePageChange(number){ 
      setCurrentPage(number)
      setContentBegining((number*8)-8)
      setContentQuantity(number*8)
      containerRef.current.scrollIntoView({behavior:"smooth"})
    }

  return (
    <main className="international_container">
        <h2>Միջազգային</h2>
        <hr/>
        <AllNews title="Թարմ նորություններ" data={data && data}/>
        <div ref={containerRef} className="international_container_bottom">
            <h3 className="international_title">Միջազգային</h3>
            
            <div>
            {Array.isArray(data) && data.map((data,key)=>{
              if(key>=contentQuantity || key<contentBeginning)return
                return <Link key={key} to={"/news/"+data.id}>
                  <AsideSlice key={key} data={data}/>

                </Link> 

            })}
              <div className="flex_container">
        
            <div className="paginate_ctn">
              <div className={"arrow "+(currentPage == 1?"":"arrow_active")} onClick={handlePrevPage}> ← </div>

              {new Array(maxPages).fill(null).map((_,key)=>{
                const rightSide = currentPage+3
                const leftSide = currentPage
                const number = key + 1

                  if(number > rightSide || number < leftSide)return
                return <div key={key} className={"round_effect "+(number === currentPage ? "paginate_active" : "")} onClick={()=>handlePageChange(number)}>
                  {number}
                </div>
              })}
              <div className={"arrow "+(currentPage == maxPages?"":"arrow_active")} onClick={handleNextPage}> → </div>
            </div>
          </div>
          
            </div>
           

        </div>
        
    </main>
  )
}

export default International