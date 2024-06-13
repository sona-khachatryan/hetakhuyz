import "./singlepagebottom.style.scss"
import SearchSlice from "../../search/searchslice/SearchSlice"
import ManyViewsSlice from "./manyviewsslice/ManyViewsSlice"
import {  NavLink } from "react-router-dom"

const SinglePageBottom = ({mostViewedNews,relatesNews}) => {
  return (
    <section className="single_page_bottom_container">
        <div className="will_like_container">
            <h3>Դուք կհավանեք</h3>
            <div>
            {relatesNews.map((data,key)=>{
                 return <NavLink key={key} to={(data.newsContent?.file.isImage?"/news/":"/videos/")+data.id}> <SearchSlice  data={data && data}/></NavLink>
        })
        }
            </div>
            <hr />
        </div>
        <div className="single_page_many_views_container">
            <h3>Շատ դիտվող</h3>
            <div>
                {mostViewedNews.map((data,key)=>{
                    return <NavLink key={key} to={(data.newsContent?.file.isImage?"/news/":"/videos/")+data.id}><ManyViewsSlice data={data && data} count={key+1}/></NavLink>
                })}
            </div>
        </div>
    </section>
  )
}

export default SinglePageBottom