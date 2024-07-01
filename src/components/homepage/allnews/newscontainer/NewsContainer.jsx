import "./newscontainer.style.scss";
import { address,handleDate} from "../../../../repetitiveVariables/variables";

const NewsContainer = ({data:{category,createdAt,title = "",description,img,country,countryId}}) => {

  function handleBorderColor(){
    return country.title === 'Հայաստան' ? "all_news_container_col_armenia" : country.title === 'Միջազգային' ? "all_news_container_col_international" : "all_news_container_col_region";
  }
    return (
        <div className="newscontainer">
            <h4 className={handleBorderColor()}>
                {country.title === 'Հայաստան' ? category?.title : country.title === 'Միջազգային' ? country.title : country?.title}
            </h4>
            <img src={address+"/"+img} alt="Լրատվական նկար" />
            <span>{handleDate(createdAt)}</span>
            <h3>{title}</h3>
            {/*<p>{description}</p>*/}
        </div>
  )
}

export default NewsContainer