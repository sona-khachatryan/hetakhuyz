import "./armenia.style.scss"
import AllNews from "../../homepage/allnews/AllNews"
import { useState,useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { address } from "../../../repetitiveVariables/variables"
import ArticleSubsection from "../article/ArticleSubsection"

const Armenia = () => {
    const [data,setData] = useState()
    const [dataMilitary,setDataMilitary] = useState([])
    const [dataPolitics,setDataPolitics] = useState([])
    const [dataLegal,setDataLegal] = useState([])
    const [dataSociety,setDataSociety] = useState([])
    
    
    useEffect(()=>{
      (async () => {
        try {
          const {data}= await axios.get(`${address}/news/filter?countryId=1`) 
          const politics = await axios.get(`${address}/news/filter?countryId=1&categoryId=1`) 
          const legal = await axios.get(`${address}/news/filter?countryId=1&categoryId=2`) 
          const military = await axios.get(`${address}/news/filter?countryId=1&categoryId=3`) 
          const society = await axios.get(`${address}/news/filter?countryId=1&categoryId=4`) 
          Array.isArray(data) && setData(data.filter((data)=>data.newsContent.file.isImage))
          Array.isArray(politics.data) && setDataPolitics(politics.data.filter((data)=>data.newsContent.file.isImage))
          Array.isArray(military.data) && setDataMilitary(military.data.filter((data)=>data.newsContent.file.isImage))
          Array.isArray(legal.data) && setDataLegal(legal.data.filter((data)=>data.newsContent.file.isImage))
          Array.isArray(society.data) && setDataSociety(society.data.filter((data)=>data.newsContent.file.isImage))
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
         {data && <ArticleSubsection title="Քաղաքական" to="politics" data={dataPolitics}/>}
         {data && <ArticleSubsection title="Իրավական" to="legal" data={dataLegal}/>}
         {data && <ArticleSubsection title="Ռազմական" to="military" data={dataMilitary}/>}
         {data && <ArticleSubsection title="Հասարակություն" to="society" data={dataSociety}/>}
    </main>
  )
}

export default Armenia