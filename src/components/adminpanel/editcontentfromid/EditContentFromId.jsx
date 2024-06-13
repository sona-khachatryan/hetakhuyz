import {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import RichEditor from '../reactquil/RichEditor'
import DropDownMenu from '../admincontents/dropdownmenu/DropDownMenu'
import { categoriesfilter,categories, contentTypefilter, countries, countriesfilter, address } from '../../../repetitiveVariables/variables'
import axios from '../interceptor'

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
const contentTypeData = [
    {label:"Թեքստային",value:"text"},
    {label:"Վիդեո",value:"video"},
    {label:"Ուղիղ եթեր",value:"live"},
    {label:"Բոլորը", value:"all"}
]
const chooseSubsectionInternational = [
    {label:"Բոլորը", value:"all"}
]

const EditContentFromId = () => {
    const [dataId,setDataId] = useState("")
    const [richEditorValue, setRichEditorValue] = useState()
    const [sectionValue, setSectionValue] = useState('')
    const [subsectionValue, setSubsectionValue] = useState('')
    const [contentType, setContentType] = useState('')
    const [image,setImage]=useState('')
    const [titleValue,setTitleValue]=useState('')
    const [descriptionValue,setDescriptionValue]=useState('')
    const [video,setVideo] = useState('')
    const {id} = useParams()

    const [videoLink,setVideoLink] = useState('')

    const [pictureTitle, setPictureTitle] = useState('')
    const [pictureAuthor, setPictureAuthor] = useState('')
    const [fileAuthor, setFileAuthor] = useState('')

    useEffect(()=>{
        (async () => {
            try {
                const {data} = await axios.get(`${address}/news/getOne/${id}`)
                setDataId(data)
                setRichEditorValue(data.newsContent.description)
                if(data.countryId == 1 || data.countryId == 6){
                    setSectionValue(countriesfilter[data.countryId])
                    setSubsectionValue(categoriesfilter[data.categoryId])
                }else{
                    setSectionValue("region")
                    setSubsectionValue(countriesfilter[data.countryId])
                }
                if(data.newsContent.file.isImage){
                    setContentType("text")
                }else{
                    setContentType("video")
                }
                setVideoLink(data?.newsContent?.file?.url)
                setFileAuthor(data?.newsContent?.file?.author)
                setPictureAuthor(data?.newsContent?.author)
                setPictureTitle(data?.newsContent?.file?.title)
                setTitleValue(data.title)
                setDescriptionValue(data.description)
            } catch (error) {
                console.log(error)
            }
        })()
    },[])


    function handleChange(e){
        setImage(e.target.files[0])
    }
    function handleVideoChange(e){
        setVideo(e.target.files[0])
    }

    function handleEditContent (){
      
        (async () => {
          const formData = new FormData()
            formData.append('title', titleValue)
            formData.append('description', descriptionValue)
            formData.append('contentTitle', titleValue)
            formData.append('contentDescription', richEditorValue)
            formData.append('author', pictureAuthor)
            formData.append('fileTitle',pictureTitle)
            formData.append('fileAuthor', fileAuthor )
            if(sectionValue == 'armenia'){
              formData.append('countryId', countriesfilter[sectionValue])
              formData.append('categoryId', categories[subsectionValue])
            }else if(sectionValue == 'international'){
                formData.append('countryId', countriesfilter[sectionValue])
            }else{
              formData.append('countryId',countriesfilter[subsectionValue])
            }
            formData.append('img', image)
            if(video){
                formData.append('fileContent', video) 
                formData.append('middleImage', video)
            }else{
                formData.append('fileContent', image) 
                formData.append('middleImage', image)
            }
  
            try {
            const { data } = await axios.put(`${address}/news/editNews/${id}`, formData)
          } catch (error) {
                console.log(error)
              }
            })()
      }

    return (
    <div>
        <div className='drop_down_container'>

        <DropDownMenu render={setSectionValue} chooseSection={chooseSection} title ={countries[sectionValue]}/>
        {sectionValue == "region"?<DropDownMenu render={setSubsectionValue} chooseSection={chooseSubsectionRegion} title ={countries[subsectionValue]}/>:sectionValue == "international"?<DropDownMenu chooseSection={chooseSubsectionInternational} title ="Բոլորը"/>:<DropDownMenu render={setSubsectionValue} chooseSection={chooseSubsection} title ={categoriesfilter[subsectionValue]}/>}
        <DropDownMenu render={setContentType} chooseSection={contentTypeData} title ={contentTypefilter[contentType]}/>
        </div>
        <div className="admin_url_container">
            {contentType == "live"?<input className="add_live_stream_input" type="text" placeholder="Type the livestream link there"/>:null}

            {contentType == "video"?
            <>
            <input className='file' type="file" accept="image/*,.pdf" onChange={handleChange}/>
            <input className="file"   type="file" onChange={handleVideoChange}/>
            <p>For Video or write link</p>
            <input className="add_video_input" value={videoLink} onChange={(e)=>setVideoLink(e.target.value)} type="text" placeholder="Type video link there"/>
            <input className="add_video_input" type="text" value={pictureAuthor} onChange={(e)=>{setPictureAuthor(e.target.value)}} placeholder="Who is the author? "/>
            <input value={titleValue} type="text" placeholder="title" onChange={(e)=>setTitleValue(e.target.value)}/>
            <input value={descriptionValue} onChange={(e)=>setDescriptionValue(e.target.value)} type="text" placeholder="description"/>
            </>
            
            :null}
            {contentType == "text"?
            <>
            <input className='file' type="file" accept="image/*,.pdf" onChange={handleChange}/>
            <input className="add_video_input" value={pictureTitle} onChange={(e)=>{setPictureTitle(e.target.value)}} type="text" placeholder="Picture title"/>
            <input className="add_video_input" value={pictureAuthor} onChange={(e)=>{setPictureAuthor(e.target.value)}} type="text" placeholder="Picture author"/>
            <input className="add_video_input"  value={titleValue} type="text" placeholder="title" onChange={(e)=>setTitleValue(e.target.value)}/>
            <input className="add_video_input"  value={descriptionValue} onChange={(e)=>setDescriptionValue(e.target.value)} type="text" placeholder="description"/>
            <input className="add_video_input" value={fileAuthor} onChange={(e)=>{setFileAuthor(e.target.value)}} type="text" placeholder="Who is the author?"/>
            </>:null}
            </div>
        <RichEditor value={richEditorValue} setValue={setRichEditorValue} btnValue="Edit Content" click={handleEditContent} />
    </div>
  )
}

export default EditContentFromId