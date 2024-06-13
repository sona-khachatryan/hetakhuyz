import "./addcontent.style.scss"
import {useRef, useState,useEffect} from 'react'
import DropDownMenu from '../admincontents/dropdownmenu/DropDownMenu'
import RichEditor from "../reactquil/RichEditor"
import { categories, countriesfilter , address } from "../../../repetitiveVariables/variables"
import axios from "../interceptor"

const chooseSection = [
    {label:"Հայաստան",value:"armenia"},
    {label:"Տարածաշրջան",value:"region"},
    {label:"Միջազգային",value:"international"},
    {label:"Բոլորը", value:"all"}
]
const chooseSubsection = [
    {label:"Քաղաքական",value:"politics"},
    {label:"Իրավական",value:"legal"},
    {label:"Ռազմական",value:"military"},
    {label:"Հասարակություն",value:"society"},
    {label:"Բոլորը", value:"all"}
]
const chooseSubsectionRegion = [
    {label:"Վրաստան",value:"georgia"},
    {label:"Թուրքիա",value:"turkey"},
    {label:"Իրան",value:"iran"},
    {label:"Ադրբեջան",value:"azerbaijan"},
    {label:"Բոլորը", value:"all"}
]
const chooseSubsectionInternational = [
  {label:"Բոլորը", value:"all"}
]
const contentTypeData = [
    {label:"Թեքստային",value:"text"},
    {label:"Վիդեո",value:"video"},
    {label:"Ուղիղ եթեր",value:"live"},
    {label:"Բոլորը", value:"all"}
]


const AddContent = () => {
    const [sectionValue, setSectionValue] = useState('')
    const [subsectionValue, setSubsectionValue] = useState('')
    const [contentType, setContentType] = useState('')
    const [richEditorValue, setRichEditorValue] = useState('')
    const [image,setImage]=useState('')
    const [video,setVideo]=useState('')
    const liveStreamRef = useRef(null)
    const liveTitleRef = useRef(null)

    const videoLinkRef = useRef(null)

    const titleRef = useRef(null)
    const descriptionRef = useRef(null)
    const pictureTitleRef = useRef(null)
    const pictureAuthorRef = useRef(null)
    const fileAuthorRef = useRef(null)
    
    function handleAddContent (e){
      (async () => {
        const formData = new FormData()
        if(contentType == "live"){
          formData.append('url', liveStreamRef.current.value)
          formData.append('title', liveTitleRef.current.value)
          
          try {
            const  data = await axios.post(`${address}/live/create`, formData)
            
          } catch (error) {
            console.log(error)
          }
        }else{
          formData.append('title', titleRef.current.value)
          formData.append('description', descriptionRef.current.value)
          formData.append('contentTitle', titleRef.current.value)
          formData.append('contentDescription', richEditorValue)
          if(sectionValue == 'armenia'){
            formData.append('countryId', countriesfilter[sectionValue])
            formData.append('categoryId', categories[subsectionValue])
          }else if(sectionValue == 'international'){
            formData.append('countryId',countriesfilter[sectionValue])
          }else{
            formData.append('countryId',countriesfilter[subsectionValue])
          }
          formData.append('author', pictureAuthorRef.current.value)
          if(pictureTitleRef.current){
          formData.append('fileTitle',pictureTitleRef.current.value)
          }else{
            formData.append('fileTitle',pictureAuthorRef.current.value)

          }
          formData.append('fileAuthor', fileAuthorRef.current.value )
          formData.append('img', image)
          if(video){
            formData.append('fileContent', video) 
            formData.append('middleImage', video)
          }else{
            formData.append('fileContent', image) 
            formData.append('middleImage', image)
          }
          if(videoLinkRef.current?.value){
              formData.append('url', videoLinkRef.current.value)

            }
          
          try {
            const { data } = await axios.post(`${address}/news/create`, formData, 
            {headers: { 
              Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJpZCI6NSwiaWF0IjoxNzA5NzQ1NDY4LCJleHAiOjE3MDk3NDYzNjh9.kHe_YFYmvsHma1eNunFQnx4W-6-uZch-kpkRRVtaO30',
            }})
          } catch (error) {
            console.log(error)
          }
        }
      })()
    }
    
    
    function handleChange(e){
        setImage(e.target.files[0])
    }
    function handleVideoChange(e){
        setVideo(e.target.files[0])
    }
    
  return (
    <div className="admin_add_contents_container">
    
            <div className="drop_down_container">
            <DropDownMenu render={setSectionValue} chooseSection={chooseSection} title ="Choose section"/>
          
            {sectionValue == "region"?<DropDownMenu render={setSubsectionValue} chooseSection={chooseSubsectionRegion} title ="Choose subsection"/>:sectionValue == "international"?<DropDownMenu chooseSection={chooseSubsectionInternational} title ="Choose subsection"/>:<DropDownMenu render={setSubsectionValue} chooseSection={chooseSubsection} title ="Choose subsection"/>}

            <DropDownMenu render={setContentType} chooseSection={contentTypeData} title ="Content type"/>
            </div>
            <div className="admin_url_container">
            {contentType == "live"?
            <>
            <input ref={liveStreamRef} className="add_live_stream_input" type="text" placeholder="Type the livestream link there"/>
            <input ref={liveTitleRef} className="add_live_stream_input" type="text" placeholder="Title"/>
            </>
            
            :null}
            
            {contentType == "video"?
            <>
            <input className="file"  type="file" accept="image/*,.pdf" onChange={handleChange}/>
            <p>For picture</p>
            <input className="file"   type="file" onChange={handleVideoChange}/>
            <p>For Video or write link</p>
            <input ref={videoLinkRef} className="add_video_input" type="text" placeholder="Type video link there"/>
            <input ref={pictureAuthorRef} className="add_video_input" type="text" placeholder="Video Author"/>
            <input ref={fileAuthorRef}className="add_video_input" type="text" placeholder="Who is the author? "/>
            <input className="add_video_input" ref={titleRef} type="text" placeholder="title"/>
            <input className="add_video_input" ref={descriptionRef} type="text" placeholder="description"/>
            </>
            
            :null}

            {contentType == "text"?
            <>
            <input className="file"  type="file" accept="image/*,.pdf" onChange={handleChange}/>
            <p>For picture</p>
            <input ref={pictureTitleRef} className="add_video_input" type="text" placeholder="Picture Title"/>
            <input ref={pictureAuthorRef} className="add_video_input" type="text" placeholder="Picture Author"/>
            <input className="add_video_input" ref={titleRef} type="text" placeholder="title"/>
            <input className="add_video_input" ref={descriptionRef} type="text" placeholder="description"/>
            <input ref={fileAuthorRef}className="add_video_input" type="text" placeholder="Who is the author? "/>
            </>:null}
            </div>
            {contentType == "live"?<button onClick={handleAddContent}>Add New Content</button>:
             <RichEditor click={handleAddContent} value={richEditorValue} setValue={setRichEditorValue}/>
            }
        </div>
  )
}

export default AddContent