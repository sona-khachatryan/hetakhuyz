import './veryreadable.style.scss'
import VeryReadableNews from './veryreadablenews/VeryReadableNews'
import VeryReadableNewsRight from './veryreadablenewsright/VeryReadableNewsRight'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { address } from '../../../repetitiveVariables/variables'

const VeryReadable = () => {
  const [dataMostWiew,setDataMostWiew] = useState([])
  
  useEffect(()=>{
    (async () => {
      try {
        const {data}= await axios.get(`${address}/news/getMostViewed`)
        setDataMostWiew(data)
      } catch (error) {
        console.log(error)
      }
    })()
  },[])

  return (
    <section className='very_readable_container'>
      <div className='very_readables'>
        <h2>Շատ կարդացվող</h2>
          <div className='very_readable_left'>
            {Array.isArray(dataMostWiew) && dataMostWiew.map((data,key)=>{
              if(key>=2)return
              return <Link key={key} to={"/news/"+data.id}><VeryReadableNews data={data && data}/></Link>
            })}
          </div>
      </div>
      
      <div className='very_readable_right'>
       {dataMostWiew && dataMostWiew[2] && <Link to={'/news/'+dataMostWiew[2]?.id}>
        <VeryReadableNewsRight data = {dataMostWiew[2]}/></Link>}
      </div>
    </section>
  )
}

export default VeryReadable