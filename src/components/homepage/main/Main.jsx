import './main.style.scss'
import TodayNews from '../todayNews/TodayNews'
import VeryReadable from '../veryreadable/VeryReadable'
import Watch from '../watch/Watch'
import AllNews from '../allnews/AllNews'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { address } from '../../../repetitiveVariables/variables'
import HourlyNewsFeed from "../hourlyNewsFeed/HourlyNewsFeed.jsx";


const Main = () => {
 
  const [dataAllNews,setAllNews] = useState([])

  useEffect(()=>{
    (async () => {
      try {

        const {data}= await axios.get(`${address}/news/getAll`)
        Array.isArray(data) && setAllNews(data.filter((data)=>data.newsContent.file.isImage))

      } catch (error) {
        console.log(error)
      }
    })()
  },[])
 
  return (
      <main className='home_page'>
          <div className='home_page_top_section'>
              <HourlyNewsFeed/>
              <div className='home_page_daily-and-mostly-read'>
                  <TodayNews/>
                  <VeryReadable/>
              </div>
          </div>
          <Watch/>
          <AllNews title={"Բոլոր նորությունները"} data={dataAllNews && dataAllNews}/>
      </main>
  )
}

export default Main