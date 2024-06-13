import "./newscontainer.style.scss"
import { address,handleDate} from "../../../../repetitiveVariables/variables"

const NewsContainer = ({data:{category,createdAt,title = "",description,img,country,countryId}}) => {

  function handleBorderColor(){
    return countryId == 1?"all_news_container_col_armenia":countryId == 6?"all_news_container_col_international":"all_news_container_col_region"
  }
    return (
    <div className="newscontainer">
        <h4 className={handleBorderColor()}>
          {countryId == 1?category?.title:countryId == 6?"Միջազգային":country?.title}
        </h4>
        <img src={address+"/"+img} alt="Լրատվական նկար" />
        <span>{handleDate(createdAt)}</span>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
  )
}

export default NewsContainer