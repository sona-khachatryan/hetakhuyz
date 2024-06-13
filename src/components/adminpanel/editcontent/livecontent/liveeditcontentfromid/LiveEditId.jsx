import { useParams } from "react-router-dom"
import "./liveeditid.style.scss"
import { useEffect, useState } from "react"
import { address } from "../../../../../repetitiveVariables/variables"
import axios from "../../../interceptor"

const LiveEditId = () => {
    const [url,setUrl] = useState()
    const [title,setTitle] = useState()
    const {id} = useParams()

    useEffect(()=>{
        (async () => {
            try {
                const {data} = await axios.get(`${address}/live/getAll`) 
                if(Array.isArray(data)){
                    const dataFilter = data.filter((data)=>data.id == id)[0]
                    setUrl(dataFilter.url)
                    setTitle(dataFilter.title)
                }
               
            } catch (error) {
                console.log(error)
            }
        })()
    },[])
   
    function handleEditContent (){
      
        (async () => {
            const formData = new FormData()
            formData.append('url', url)
            formData.append('title', title)
        
            try {
            const { data } = await axios.put(`${address}/live/edit/${id}`,formData)
  
          } catch (error) {
                console.log(error)
              }
            })()
      }


  return (
    <div className="live_edit_from_id_container">
        <input value={url && url} onChange={(e)=>setUrl(e.target.value)} type="text" placeholder="Type the livestream link there"/>
        <input value={title && title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Title"/>
        <button onClick={handleEditContent}>Edit Content</button>
    </div>
  )
}

export default LiveEditId