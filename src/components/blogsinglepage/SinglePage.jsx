import { useState , useEffect } from "react"
import "./singlepage.style.scss"
import SinglePageBottom from "./singlepagebottom/SinglePageBottom"
import {useParams } from "react-router-dom"
import axios from "axios"
import { address,handleDate, scrollTop } from "../../repetitiveVariables/variables"

const SinglePage = () => {
  const [dataId,setDataId] = useState()
  const [mostViewedNews,setMostViewedNews] = useState("")
  const [relatesNews,setRelatesNews] = useState("")
  const {id} = useParams()

  useEffect(()=>{
    (async () => {
      try {
        const {data} = await axios.get(`${address}/news/getOne/${id}`)
        const {data:{mostViewedNews,relatesNews}} = await axios.get(`${address}/news/getMostViewedAndRelates/${data.categoryId?data.categoryId:1}`)
        setMostViewedNews(mostViewedNews)
        setRelatesNews(relatesNews)
        setDataId(data)
      } catch (error) {
        console.log(error)
      }
    })()
    scrollTop()
  },[id])
  return (
      <>
          <main className="single_page_container">
              <div className="single_page_section">
                  {
                      dataId && dataId.country.title !== 'Հայաստան' && dataId.country.title !== 'Միջազգային'
                          ?
                              <>
                                  <h3>Տարածաշրջան</h3>
                                  <div className='region_title'>
                                      <div></div>
                                  </div>
                                  <h3>{dataId && dataId?.country?.title}</h3>
                              </>
                          :
                              <>
                                  <h3>{dataId && dataId?.country?.title}</h3>
                                  {dataId?.category?.title ?
                                      <>
                                          <div>
                                              <div></div>
                                          </div>
                                          <h3>{dataId?.category?.title}</h3>
                                      </>
                                  :
                                  ''
                              }
                              </>
                  }
              </div>

              <div className="single_page_title">
                  <h2>{dataId && dataId?.title}</h2>

                  {dataId && !dataId?.newsContent?.file?.isImage
                      ?
                      (dataId?.newsContent?.file?.url?.includes('www')
                              ?
                                  <iframe src={dataId?.newsContent?.file?.url} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                              :
                                  <video controls src={address + "/" + dataId?.newsContent?.file?.url}></video>
                      )
                      :
                      dataId && <img src={`${address}/${dataId?.img}`} alt="Լրատվական Նկար"/>}
                  
                  {dataId?.newsContent?.file?.author ? <h3>{dataId?.newsContent?.file?.isImage ? 'Նկարի' : 'Տեսանյութի'} հեղինակ՝ {dataId?.newsContent?.file?.author}</h3> : ''}
              </div>

              <div className="single_page_about">
                  <hr className={dataId && dataId.country.title === 'Հայաստան' ? "" : dataId && dataId.country.title === 'Միջազգային' ? "international_hr" : "region_hr"}/>

                  <div>
                      {dataId && <h3>{handleDate(dataId.createdAt)}</h3>}
                      {/*<div className={dataId && dataId.countryId == 1?"":dataId && dataId.countryId == 6?"international_div":"region_div"}></div>*/}
                      {/*<h3>երկար կարդալու</h3>*/}
                  </div>
                  <div className={`html_content ${dataId && dataId.country.title === 'Հայաստան' ? "html_content_armenia":dataId && dataId.country.title === 'Միջազգային' ? "html_content_international" : "html_content_region"}`} dangerouslySetInnerHTML={{__html: dataId && dataId.newsContent.description}}></div>

              </div>
              <div className="single_page_about_bottom">
                  <h4>{dataId && dataId?.newsContent?.author ? `Հեղ․՝ ${dataId?.newsContent?.author}` : ''}</h4>
                  <ul>
                      <li>
                          <img src="/img/facebook.svg" alt="Facebook"/>
                      </li>
                      <li>
                          <img src="/img/insta.svg" alt="Instagram"/>
                      </li>
                      <li>
                          <img src="/img/twitter.svg" alt="Twitter"/>
                      </li>
                      <li>
                          <img src="/img/link.svg" alt="Link"/>
                      </li>
                  </ul>
              </div>
          </main>
          {relatesNews && <SinglePageBottom mostViewedNews={mostViewedNews} relatesNews={relatesNews}/>}
      </>
  )
}

export default SinglePage