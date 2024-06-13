import "./editcontent.style.scss"
import DropDownMenu from "../admincontents/dropdownmenu/DropDownMenu"
import { useState,useRef, useEffect } from "react"
import FilterContent from "./filtercontent/FilterContent"
import { Link, Outlet, useParams } from "react-router-dom"
import axios from "axios"
import { categories, countriesfilter , address} from "../../../repetitiveVariables/variables"
import LiveContent from "./livecontent/LiveContent"

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



const EditContent = () => {
    const [sectionValue, setSectionValue] = useState('all')
    const [subsectionValue, setSubsectionValue] = useState('all')
    const [contentType, setContentType] = useState('all')

    const [currentPage, setCurrentPage] = useState(1)
    const [contentBeginning,setContentBegining] = useState(0)
    const [contentQuantity,setContentQuantity] = useState(6)
    
    const [data,setData] = useState([])

    const containerRef = useRef(null)
    const maxPages = Math.ceil(data.length/6)
    const {id} = useParams()

    function handleFilter(data){
      if(contentType == "all"){
       return setData(data)
      }else if(contentType == "text"){
       return setData(data.filter((data)=>data.newsContent?.file.isImage))
      }else if (contentType == "video"){
       return setData(data.filter((data)=>data.newsContent && !data.newsContent.file.isImage))
      }else{
        return setData(data.filter((data)=>data.url))
      }
    }

    useEffect(()=>{
      if(!id){
        (async () => {
          const lives = await axios.get(`${address}/live/getAll`)
          try {
            if(sectionValue == 'all' && subsectionValue == "all") {
              const {data}= await axios.get(`${address}/news/getAll`)
              Array.isArray(data) && handleFilter(data.concat(lives.data))
              
            }else if(sectionValue == 'international'){
              const {data}= await axios.get(`${address}/news/filter?countryId=6`)
              Array.isArray(data) && handleFilter(data)
            }else if(sectionValue == 'armenia' && subsectionValue == "all"){
              const {data}= await axios.get(`${address}/news/filter?countryId=1`)
              Array.isArray(data) &&  handleFilter(data)
            }else if(sectionValue == "region"){
              if(subsectionValue == "all"){
                const {data}= await axios.get(`${address}/news/getAll`)
                const dataRegion = data.filter((data)=>data.countryId != 1 && data.countryId != 6)
                Array.isArray(dataRegion) &&  handleFilter(dataRegion)
              }else{
                const {data}= await axios.get(`${address}/news/filter?countryId=${countriesfilter[subsectionValue]}`)
                Array.isArray(data) &&  handleFilter(data)
              }
            }else{
              const {data}= await axios.get(`${address}/news/filter?countryId=${countriesfilter[sectionValue]}&categoryId=${categories[subsectionValue]}`)
              Array.isArray(data) && handleFilter(data)
              
            }
            
          } catch (error) {
            console.log(error)
          }
        })()
        setCurrentPage(1)
        setContentBegining(0)
        setContentQuantity(6)
      }
      
    },[sectionValue,subsectionValue,contentType,id])
    
    function handleNextPage () {
      if(currentPage<maxPages){
        setCurrentPage(currentPage+1)
        setContentBegining(contentQuantity)
        setContentQuantity(contentQuantity+6)
        containerRef.current.scrollIntoView({behavior:"smooth", block: "start"})
      }
    }
    
    function handlePrevPage (){
      if(currentPage>1){
        setCurrentPage(currentPage-1)
        setContentBegining(contentBeginning - 6)
        setContentQuantity(contentQuantity-6)
        containerRef.current.scrollIntoView({behavior:"smooth", block: "start"})
      }
    }
    
    function handlePageChange(number){ 
      setCurrentPage(number)
      setContentBegining((number*6)-6)
      setContentQuantity(number*6)
      containerRef.current.scrollIntoView({behavior:"smooth", block: "start"})
    }

    function handleSectionValue(value){
      if(value == "region" || value == "armenia"){
        setSubsectionValue("all")
        setContentType("all")
      }      
      setSectionValue(value)
    }

  return (
    <>
    {id?<Outlet/>:
    <>
      <div ref={containerRef} className="drop_down_container" >
        
        <DropDownMenu render={handleSectionValue} chooseSection={chooseSection} edit={true} title ="Բոլորը"/>
        {sectionValue == "region"?<DropDownMenu valueSelected={subsectionValue} render={setSubsectionValue} edit={true} chooseSection={chooseSubsectionRegion} title ="Բոլորը"/>:sectionValue == "international"?<DropDownMenu chooseSection={chooseSubsectionInternational} title ="Բոլորը"/>:<DropDownMenu valueSelected={subsectionValue} render={setSubsectionValue} chooseSection={chooseSubsection} edit={true} title ="Բոլորը"/>}

        <DropDownMenu valueSelected={contentType} render={setContentType} chooseSection={contentTypeData} edit={true} title ="Բոլորը"/>

    </div>
    {Array.isArray(data) && data.map((data,key)=>{
        if(key>=contentQuantity || key<contentBeginning)return
        if(data.url)return <Link key={key} to={"/admin/edit/live/"+data.id}><LiveContent data={data}/></Link>
       return <Link  key={key} to={"/admin/edit/"+data.id}><FilterContent data={data &&data}/></Link>
    })}
    <div className="flex_container">
        
        <div className="paginate_ctn">
          <div className={"arrow "+(currentPage == 1?"":"arrow_active")} onClick={handlePrevPage}> ← </div>

          {new Array(maxPages).fill(null).map((_,key)=>{
            const rightSide = currentPage+3
            const leftSide = currentPage
            const number = key + 1

              if(number > rightSide || number < leftSide)return
            return <div key={key} className={"round_effect "+(number === currentPage ? "paginate_active" : "")} onClick={()=>handlePageChange(number)}>
              {number}
            </div>
          })}
          <div className={"arrow "+(currentPage == maxPages?"":"arrow_active")} onClick={handleNextPage}> → </div>
        </div>
      </div>
    </>}
    
    </>
  )
}

export default EditContent