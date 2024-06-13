import { useState , useEffect} from 'react'
import './liveeditcontent.style.scss'
import { NavLink, useParams } from 'react-router-dom'
import { address } from '../../../../../repetitiveVariables/variables'
import axios from '../../../interceptor'

const LiveEditContent = () => {
    const [dataId,setDataId] = useState([])
    const {id} = useParams()

  useEffect(()=>{
    (async () => {
      try {
        const {data} = await axios.get(`${address}/live/getAll`)
        Array.isArray(data) && setDataId(data.filter((data)=>data.id == id)[0])
      } catch (error) {
        console.log(error)
      }
    })()
  },[])

  function handleDelete(){
    (async () => {
      try {
        const {data} = await axios.delete(`${address}/live/delete/${id}`)
      } catch (error) {
        console.log(error)
      }
    })()
  }

  return (
    <div className='live_edit_content_container'>
         <NavLink to={`/admin/edit/live/${id}/editcontent`}>
              <button>Edit Content</button>
        </NavLink> 
        <iframe src={dataId && dataId.url}></iframe>
        <h2>{dataId && dataId.title}</h2>
        <NavLink to='/admin/edit'>
            <button onClick={handleDelete}>Delete This Post</button>
        </NavLink>
    </div>
  )
}

export default LiveEditContent