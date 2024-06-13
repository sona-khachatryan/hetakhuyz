import { NavLink, useParams } from 'react-router-dom'
import './singleeditcontent.style.scss'
import { useState , useEffect } from 'react'
import {address,handleDate } from '../../../../repetitiveVariables/variables'
import axios from '../../interceptor'


const SingleEditContent = () => {
  const [dataId,setDataId] = useState()
  const {id} = useParams()

  useEffect(()=>{
    (async () => {
      try {
        const {data} = await axios.get(`${address}/news/getOne/${id}`)
        setDataId(data)
      } catch (error) {
        console.log(error)
      }
    })()
  },[])

  function handleDelete(){
    (async () => {
      try {
        const {data} = await axios.delete(`${address}/news/delete/${id}`)
      } catch (error) {
        console.log(error)
      }
    })()
  }


  return (
    <main className="edit_single_container">
        <div className="edit_single_section">
            <NavLink to={`/admin/edit/${id}/editcontent`}>
              <button>Edit Content</button>
            </NavLink>            
            
            {dataId && dataId.countryId == 6?<h3>Միջազգային</h3>:dataId && dataId.countryId == 1?
               <>
                <h3>{dataId && dataId.country.title}</h3>
                <div>
                  <div></div>
                </div>
                <h3>{dataId && dataId.category.title}</h3>
                </>:
                <>
                <h3>Տարածաշրջան</h3>
                <div>
                  <div></div>
                </div>
                <h3>{dataId && dataId.country.title}</h3>
                </>
              }
        </div>
        <div className="edit_single_title">
            <h2>{dataId &&dataId.title}</h2>
            {dataId && !dataId.newsContent.file?.isImage?<iframe src={address+"/"+dataId.newsContent.file.url}></iframe> :dataId && <img src={address+"/"+dataId.newsContent.file?.url} alt="Լրատվական Նկար" />}
            <h3>Նկարի վերնագիր {dataId && dataId.newsContent.file?.title}</h3>
            <h3>Նկարի հեղինակ {dataId && dataId.newsContent.file?.author}</h3>

        </div>

        <div className="edit_single_about">
          <hr />
            <div>
              {dataId && <h3>{handleDate(dataId.createdAt)}</h3>}
              <div></div>
              <h3>երկար կարդալու</h3>
            </div>
            <div className='html_content' dangerouslySetInnerHTML={{__html: dataId && dataId.newsContent.description}}></div>
        </div>
        <div className="edit_page_bottom">
          <h4>Հեղ․՝ {dataId && dataId.newsContent.author}</h4>

          <NavLink to='/admin/edit'><button onClick={handleDelete}>Delete this post</button></NavLink>
        </div>
    </main>
  )
}

export default SingleEditContent