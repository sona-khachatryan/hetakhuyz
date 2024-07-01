import AllNews from "../../homepage/allnews/AllNews"
import ArticleSubsection from "../article/ArticleSubsection"
import { useState , useEffect } from "react"
import { Link } from "react-router-dom"
import {getAllNews, getNewsBySectionId, getSections} from "../../../api/fetchData.js";

const Region = () => {
  const [data,setData] = useState([])
  const [dataGeorgia,setDataGeorgia] = useState([])
  const [dataTurkey,setDataTurkey] = useState([])
  const [dataIran,setDataIran] = useState([])
  const [dataAzerbaijan,setDataAzerbaijan] = useState([])

  useEffect(()=>{
    (async () => {
      try {
          const {mainSections, countries} = await getSections();
          const mainSectionIds = mainSections.map(section => section.id);
          console.log(mainSectionIds, countries);

          const data = await getAllNews();
        const turkey = await getNewsBySectionId(countries.find(country => country.title === 'Թուրքիա').id);
        const georgia = await getNewsBySectionId(countries.find(country => country.title === 'Վրաստան').id);
        const iran = await getNewsBySectionId(countries.find(country => country.title === 'Իրան').id);
        const azerbaijan = await getNewsBySectionId(countries.find(country => country.title === 'Ադրբեջան').id);

        Array.isArray(data) && setData(data.filter((data)=> !mainSectionIds.includes(data.country.id) && data.newsContent.file.isImage))
        Array.isArray(georgia) && setDataGeorgia(georgia.filter((data)=>data.newsContent.file.isImage))
        Array.isArray(turkey) && setDataTurkey(turkey.filter((data)=>data.newsContent.file.isImage))
        Array.isArray(iran) && setDataIran(iran.filter((data)=>data.newsContent.file.isImage))
        Array.isArray(azerbaijan) && setDataAzerbaijan(azerbaijan.filter((data)=>data.newsContent.file.isImage))
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
              <h2>Տարածաշրջան</h2>
              <hr  className="region_line"/>
              <ul>
                  <li><Link onClick={()=>handleTop("georgia")}  to={{ pathname: '/region',hash: '#georgia' }}>Վրաստան</Link></li>
                  <li><Link onClick={()=>handleTop('turkey')} to={{ pathname: '/region', hash:'#turkey' }}>Թուրքիա</Link></li>
                  <li><Link onClick={()=>handleTop('iran')} to={{ pathname: '/region',hash: '#iran' }}>Իրան</Link></li>
                  <li><Link onClick={()=>handleTop('azerbaijan')} to={{ pathname: '/region', hash:'#azerbaijan' }}>Ադրբեջան</Link></li>
              </ul>
          </div>
          <hr className="region_line"/>
          <AllNews title={"Թարմ Նորություններ"} data={data && data}/>
          {data && <ArticleSubsection title="Վրաստան" to="georgia" data={dataGeorgia}/>}
          {data && <ArticleSubsection title="Թուրքիա" to="turkey" data={dataTurkey}/>}
          {data && <ArticleSubsection title="Իրան" to="iran" data={dataIran}/>}
          {data && <ArticleSubsection title="Ադրբեջան" to="azerbaijan" data={dataAzerbaijan}/>}
      </main>
  )
}

export default Region