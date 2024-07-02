import { useEffect, useState,useRef } from "react"
import AllNews from "../../homepage/allnews/AllNews"
import AsideSlice from "../asideslice/AsideSlice"
import './international.style.scss'
import { Link } from "react-router-dom"
import {getNewsBySectionId, getSections} from "../../../api/fetchData.js";
import Pagination from "../../pagination/Pagination.jsx";

const International = () => {
  const [data,setData] = useState([]);
  const [contentBeginning,setContentBegining] = useState(0);
  const containerRef = useRef(null);
    
  useEffect(()=>{
    (async () => {
      try {
          const {mainSections} = await getSections();
          const data = await getNewsBySectionId(mainSections.find(section => section.title === 'Միջազգային').id);
          setData(data.filter((data)=>data.newsContent.file.isImage));
      } catch (error) {
        console.log(error)
      }
    })()
  },[])

    useEffect(()=>{
        containerRef.current.scrollIntoView({behavior:"smooth", block: "start"})
    },[contentBeginning])

  return (
      <main className="international_container">
          <h2>Միջազգային</h2>
          <hr/>
          <AllNews title="Թարմ նորություններ" data={data && data}/>
          <div ref={containerRef} className="international_container_bottom">
              <h3 className="international_title">Միջազգային</h3>
            
              <div>
                  {data.slice(contentBeginning, contentBeginning+6).map((data, key) =>
                      <Link key={key} to={"/news/"+ data.id}><AsideSlice key={key} data={data}/></Link>
                  )}
                  <div className="flex_container">
                      <Pagination totalElements={data?.length} contentBeginning={contentBeginning} setContentBeginning={setContentBegining} elementsPerPage={6}/>
                  </div>
              </div>
          </div>
      </main>
  )
}

export default International