import "./armenia.style.scss"
import AllNews from "../../homepage/allnews/AllNews"
import { useState,useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { address } from "../../../repetitiveVariables/variables"
import ArticleSubsection from "../article/ArticleSubsection"
import {getNewsBySectionId, getSections, getSubsections} from "../../../api/fetchData.js";

const Armenia = () => {
    const [data,setData] = useState([]);
    const [dataMilitary,setDataMilitary] = useState([]);
    const [dataPolitics,setDataPolitics] = useState([]);
    const [dataLegal,setDataLegal] = useState([]);
    const [dataSociety,setDataSociety] = useState([]);
    const [subsections, setSubsections] = useState();


    useEffect(()=>{
      (async () => {
        try {
            const subsections = await getSubsections();
            const {mainSections} = await getSections();
            const armenia = mainSections.find(section => section.title === 'Հայաստան');
            const data = await getNewsBySectionId(armenia.id);
            const politics = await getNewsBySectionId(armenia.id, subsections.find(section => section.title === 'Քաղաքական').id);
          const legal = await getNewsBySectionId(armenia.id, subsections.find(section => section.title === 'Իրավական').id);
          const military = await getNewsBySectionId(armenia.id, subsections.find(section => section.title === 'Ռազմական').id);
          const society = await getNewsBySectionId(armenia.id, subsections.find(section => section.title === 'Հասարակություն').id);
          Array.isArray(data) && setData(data.filter((data)=>data?.newsContent?.file?.isImage))
          Array.isArray(politics) && setDataPolitics(politics.filter((data)=>data?.newsContent?.file?.isImage))
          Array.isArray(military) && setDataMilitary(military.filter((data)=>data?.newsContent?.file?.isImage))
          Array.isArray(legal) && setDataLegal(legal.filter((data)=>data?.newsContent?.file?.isImage))
          Array.isArray(society) && setDataSociety(society.filter((data)=>data?.newsContent?.file?.isImage))
        } catch (error) {
          console.log(error)
        }
      })()
    },[])


    const handleTop = (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
  
  return (
      <main className="region_page">
          <div className="region_title_container">
              <h2>Հայաստան</h2>
              <hr/>
              <ul>
                  <li><Link onClick={()=>handleTop("politics")}  to={{ pathname: '/armenia',hash: '#politics' }}>Քաղաքական</Link></li>
                  <li><Link onClick={()=>handleTop('legal')} to={{ pathname: '/armenia', hash:'#legal' }}>Իրավական</Link></li>
                  <li><Link onClick={()=>handleTop('military')} to={{ pathname: '/armenia',hash: '#military' }}>Ռազմական</Link></li>
                  <li><Link onClick={()=>handleTop('society')} to={{ pathname: '/armenia', hash:'#society' }}>Հասարակություն</Link></li>
              </ul>
          </div>
          <hr/>
          <AllNews title="Թարմ Նորություններ" data={data && data}/>
          {dataPolitics && <ArticleSubsection title="Քաղաքական" to="politics" data={dataPolitics}/>}
          {dataLegal && <ArticleSubsection title="Իրավական" to="legal" data={dataLegal}/>}
          {dataMilitary && <ArticleSubsection title="Ռազմական" to="military" data={dataMilitary}/>}
          {dataSociety && <ArticleSubsection title="Հասարակություն" to="society" data={dataSociety}/>}
      </main>
  )
}

export default Armenia