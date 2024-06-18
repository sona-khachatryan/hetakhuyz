import "./addcontent.style.scss"
import {useRef, useState,useEffect} from 'react'
import DropDownMenu from '../admincontents/dropdownmenu/DropDownMenu'
import RichEditor from "../reactquil/RichEditor"
import { address, contentTypeData } from "../../../repetitiveVariables/variables"
import axios from "../interceptor"
import {getSections, getSubsections} from "../../../api/fetchData.js";


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

    const [sections, setSections] = useState([]);
    const [subsections, setSubsections] = useState([]);
    const [sectionsFilter, setSectionsFilter] = useState();
    const [subsectionsFilter, setSubsectionsFilter] = useState();

    useEffect(() => {
        getSubsections().then(res => setSubsections(res));
        getSections().then(res => setSections(res));
    }, []);

    useEffect(() => {
        if(sections.length) {
            const sectionsF = sections.reduce((sf, section,) => {
                sf[section.title] = section.id;
                return sf;
            }, {})
            setSectionsFilter(sectionsF);
        }

        if(subsections.length) {
            const subF = subsections.reduce((sf, sub,) => {
                sf[sub.title] = sub.id;
                return sf;
            }, {})
            setSubsectionsFilter(subF);
        }
    }, [sections, subsections]);

    function handleAddContent (e){
      (async () => {
        const formData = new FormData()
        if(contentType == "Ուղիղ եթեր"){
          formData.append('url', liveStreamRef.current.value)
          formData.append('title', liveTitleRef.current.value)
          
          try {
            const {data} = await axios.post(`${address}/live/create`, formData)
              console.log('created new live')
          } catch (error) {
            console.log(error)
          }
        }else{
          formData.append('title', titleRef.current.value)
          formData.append('description', descriptionRef.current.value)
          formData.append('contentTitle', titleRef.current.value)
          formData.append('contentDescription', richEditorValue)
          if(sectionValue == 'Հայաստան'){
            formData.append('countryId', sectionsFilter[sectionValue])
            formData.append('categoryId', subsectionsFilter[subsectionValue])
          }else if(sectionValue == 'Միջազգային'){
            formData.append('countryId',sectionsFilter[sectionValue])
          }else{
            formData.append('countryId',sectionsFilter[subsectionValue])
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
              Authorization: `bearer ${localStorage.getItem('accessToken')}`,
            }})
              console.log('created')
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
            <DropDownMenu render={setSectionValue} chooseSection={sections} title ="Choose section"/>
          
            {sectionValue == "Տարածաշրջան"?<DropDownMenu render={setSubsectionValue} chooseSection={chooseSubsectionRegion} title ="Choose subsection"/>:sectionValue == "Միջազգային"?<DropDownMenu chooseSection={chooseSubsectionInternational} title ="Choose subsection"/>:<DropDownMenu render={setSubsectionValue} chooseSection={subsections} title ="Choose subsection"/>}

            <DropDownMenu render={setContentType} chooseSection={contentTypeData} title ="Content type"/>
            </div>
            <div className="admin_url_container">
            {contentType == "Ուղիղ եթեր"?
            <>
            <input ref={liveStreamRef} className="add_live_stream_input" type="text" placeholder="Type the livestream link there"/>
            <input ref={liveTitleRef} className="add_live_stream_input" type="text" placeholder="Title"/>
            </>
            
            :null}
            
            {contentType == "Տեսանյութ"?
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

            {contentType == "Տեքստային"?
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
            {contentType == "Ուղիղ եթեր"?<button onClick={handleAddContent}>Add New Content</button>:
             <RichEditor click={handleAddContent} value={richEditorValue} setValue={setRichEditorValue}/>
            }
        </div>
  )
}

export default AddContent