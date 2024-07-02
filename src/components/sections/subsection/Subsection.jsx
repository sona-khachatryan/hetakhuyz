import { useEffect, useState,useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import {getNewsBySectionId, getSections, getSubsections} from "../../../api/fetchData.js";
import AsideSlice from "../asideslice/AsideSlice"
import Pagination from "../../pagination/Pagination.jsx";
import "./subsection.style.scss"

const Subsection = ({title}) => {
  const {pathname} = useLocation();
  const containerRef = useRef(null)
  const [data,setData] = useState([])
  const [contentBeginning,setContentBegining] = useState(0)

  useEffect(()=>{
    (async () => {
        if(pathname.includes('armenia')){
          const subsections = await getSubsections();
          const {mainSections} = await getSections();
          const armenia = mainSections.find(section => section.title === 'Հայաստան');
          const data = await getNewsBySectionId(armenia.id, subsections.find(section => section.title === title).id);
          setData(data)
        } else {
          const {countries} = await getSections();
          const data = await getNewsBySectionId(countries.find(country => country.title === title).id);
          setData(data)
        }
    })()
  },[pathname, title])


    useEffect(()=>{
      containerRef.current.scrollIntoView({behavior:"smooth", block: "start"})
    },[contentBeginning])

    function handleAfterColor(){
      return pathname.includes('armenia')?"subsection_armenia":"subsection_region"
    }

  return (
      <main className="subsection_container">
          <div ref={containerRef} className="subsection_container_bottom">
              <h3 className={handleAfterColor()}>{title}</h3>
            
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

export default Subsection