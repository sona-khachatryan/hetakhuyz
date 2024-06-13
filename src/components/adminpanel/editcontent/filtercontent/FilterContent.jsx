import './filtercontent.style.scss'
import { address,handleDate } from '../../../../repetitiveVariables/variables'

const FilterContent = ({data:{createdAt,title = "",description,img,categoryId,country,category,countryId,newsContent:{file:{isImage}}}}) => {

  return (
    <div className="filter_content_container">
      <div className='filter_content_img_container'>
        <img src={address+"/"+img} alt="Լրատվական նկար" />
        {isImage?null:<div>
          <img src="/img/fluentvideo.png" alt="" />
          <p>Հոլովակ</p>
        </div>}
      </div>
      <div>
      <div className="filter_slice_texts">
        <div className='filter_content_section_container'>
           <span>{handleDate(createdAt)}</span>
            <div>
               {countryId == 6?<p>Միջազգային</p>:countryId == 1?
               <>
                <p>{country?.title}</p>
                <div></div>
                <p>{category?.title}</p>
                </>:
                <>
                <p>Տարածաշրջան</p>
                <div></div>
                <p>{country?.title}</p>
                </>
                }
            </div>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      </div>
    </div>
  )
}

export default FilterContent